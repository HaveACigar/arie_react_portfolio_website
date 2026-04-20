from collections.abc import Callable
from typing import Any, TypeVar

from app.config import settings

try:
    from langsmith import traceable
except Exception:  # pragma: no cover - optional dependency runtime path
    traceable = None

F = TypeVar("F", bound=Callable[..., Any])


def traceable_op(name: str) -> Callable[[F], F]:
    def decorator(func: F) -> F:
        if traceable is None:
            return func
        if not settings.langsmith_tracing:
            return func
        try:
            wrapped = traceable(name=name)(func)
            return wrapped
        except Exception:
            return func

    return decorator
