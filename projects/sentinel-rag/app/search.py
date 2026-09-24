from azure.identity import DefaultAzureCredential
from azure.search.documents import SearchClient
from azure.search.documents.models import VectorizedQuery
from .config import settings
from .embeddings import embed

def get_search_client() -> SearchClient:
    return SearchClient(
        endpoint=settings.azure_search_endpoint,
        index_name=settings.azure_search_index,
        credential=DefaultAzureCredential(),
    )

def retrieve(question: str) -> list[dict]:
    client = get_search_client()
    vector = VectorizedQuery(
        vector=embed(question),
        k_nearest_neighbors=settings.top_k,
        fields="contentVector",
    )
    results = client.search(
        search_text=question,
        vector_queries=[vector],
        top=settings.top_k,
        select=["id", "content", "source"],
    )
    return [
        {"id": r["id"], "content": r["content"], "source": r["source"]}
        for r in results
    ]
