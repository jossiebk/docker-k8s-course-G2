import logging

from fastapi import APIRouter, HTTPException, status

from services.review_service import ReviewService


logger = logging.getLogger(__name__)

router = APIRouter()
service = ReviewService()


@router.get("/health/live")
def health_live():
    logger.info("GET /health/live - Respuesta 200")

    return {"status": "Healthy"}


@router.get("/health/ready")
def health_ready():
    logger.info("GET /health/ready - Inicio")

    if not service.is_database_available():
        logger.warning("GET /health/ready - MongoDB no disponible")

        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="MongoDB no está disponible."
        )

    logger.info("GET /health/ready - Respuesta 200")

    return {"status": "Healthy"}


@router.get("/api/reviews")
def get_reviews():
    try:
        logger.info("GET /api/reviews - Inicio")

        reviews = service.get_all()

        logger.info(
            "GET /api/reviews - Respuesta 200. Reviews: %d",
            len(reviews)
        )

        return reviews

    except ConnectionError as error:
        logger.error(
            "GET /api/reviews - MongoDB no disponible: %s",
            error
        )

        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="MongoDB no está disponible."
        )

    except Exception:
        logger.exception("GET /api/reviews - Error inesperado")

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Ocurrió un error interno."
        )


@router.get("/api/reviews/{review_id}")
def get_review(review_id: int):
    try:
        logger.info(
            "GET /api/reviews/%d - Inicio",
            review_id
        )

        review = service.get_by_id(review_id)

        if review is None:
            logger.warning(
                "GET /api/reviews/%d - Review no encontrada",
                review_id
            )

            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Review no encontrada."
            )

        logger.info(
            "GET /api/reviews/%d - Respuesta 200",
            review_id
        )

        return review

    except HTTPException:
        raise

    except ConnectionError as error:
        logger.error(
            "GET /api/reviews/%d - MongoDB no disponible: %s",
            review_id,
            error
        )

        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="MongoDB no está disponible."
        )

    except Exception:
        logger.exception(
            "GET /api/reviews/%d - Error inesperado",
            review_id
        )

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Ocurrió un error interno."
        )


@router.post("/api/reviews", status_code=status.HTTP_201_CREATED)
def create_review(review: dict):
    try:
        logger.info("POST /api/reviews - Inicio")

        created_review = service.create(review)

        logger.info(
            "POST /api/reviews - Review creada. Id: %d",
            created_review["id"]
        )

        return created_review

    except ConnectionError as error:
        logger.error(
            "POST /api/reviews - MongoDB no disponible: %s",
            error
        )

        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="MongoDB no está disponible."
        )

    except Exception:
        logger.exception(
            "POST /api/reviews - Error inesperado"
        )

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Ocurrió un error interno."
        )