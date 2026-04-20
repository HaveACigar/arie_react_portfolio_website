import re
from app.config import settings


EMAIL_PATTERN = re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}")
PHONE_PATTERN = re.compile(r"\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b")


def check_input_safety(question: str) -> tuple[bool, str | None]:
    lowered = question.lower()
    blocked_terms = [t.strip().lower() for t in settings.blocked_terms.split(",") if t.strip()]

    for term in blocked_terms:
      if term and term in lowered:
          return False, f"Question contains blocked term: {term}"

    if EMAIL_PATTERN.search(question):
        return False, "Question appears to contain an email address."
    if PHONE_PATTERN.search(question):
        return False, "Question appears to contain a phone number."

    return True, None
