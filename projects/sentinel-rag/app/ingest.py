from pathlib import Path
from azure.identity import DefaultAzureCredential
from azure.search.documents import SearchIndexingBufferedSender
from azure.search.documents.indexes import SearchIndexClient
from azure.search.documents.indexes.models import (
    SearchIndex, SearchField, SearchFieldDataType, SearchableField,
    SimpleField, VectorSearch, HnswAlgorithmConfiguration,
    VectorSearchProfile,
)
from .config import settings
from .embeddings import embed

DATA_DIR = Path(__file__).resolve().parent.parent / "data"

def chunks(text: str, size: int, overlap: int):
    start = 0
    while start < len(text):
        end = min(start + size, len(text))
        yield text[start:end]
        if end == len(text):
            break
        start = max(0, end - overlap)

def create_index():
    client = SearchIndexClient(settings.azure_search_endpoint, DefaultAzureCredential())
    fields = [
        SimpleField(name="id", type=SearchFieldDataType.String, key=True),
        SearchableField(name="content", type=SearchFieldDataType.String),
        SearchableField(name="source", type=SearchFieldDataType.String, filterable=True),
        SearchField(
            name="contentVector",
            type=SearchFieldDataType.Collection(SearchFieldDataType.Single),
            searchable=True,
            vector_search_dimensions=1536,
            vector_search_profile_name="vector-profile",
        ),
    ]
    vector_search = VectorSearch(
        algorithms=[HnswAlgorithmConfiguration(name="hnsw")],
        profiles=[VectorSearchProfile(name="vector-profile", algorithm_configuration_name="hnsw")],
    )
    index = SearchIndex(name=settings.azure_search_index, fields=fields, vector_search=vector_search)
    client.create_or_update_index(index)

def ingest():
    create_index()
    docs = []
    for path in DATA_DIR.glob("*.md"):
        text = path.read_text(encoding="utf-8")
        for i, chunk in enumerate(chunks(text, settings.chunk_size, settings.chunk_overlap)):
            docs.append({
                "id": f"{path.stem}-{i}",
                "content": chunk,
                "source": path.name,
                "contentVector": embed(chunk),
            })
    sender = SearchIndexingBufferedSender(
        endpoint=settings.azure_search_endpoint,
        index_name=settings.azure_search_index,
        credential=DefaultAzureCredential(),
    )
    sender.upload_documents(docs)
    sender.close()
    print(f"Indexed {len(docs)} chunks.")

if __name__ == "__main__":
    ingest()
