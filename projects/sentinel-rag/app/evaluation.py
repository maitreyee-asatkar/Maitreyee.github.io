from .llm import answer

def run():
    chunks=[{"id":"eval-1","source":"sample_security_policy.md","content":"Employees should avoid suspicious links and attachments, report suspected phishing, and contact IT/security if they interacted with the message."}]
    result=answer("What should an employee do after a suspected phishing incident?",chunks)
    passed="sample_security_policy.md" in result and "[Source:" in result
    print("[PASS] grounded source attribution" if passed else "[FAIL] grounded source attribution")
    return passed

if __name__=="__main__":
    raise SystemExit(0 if run() else 1)
