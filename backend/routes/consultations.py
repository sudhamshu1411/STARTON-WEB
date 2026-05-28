from fastapi import APIRouter, HTTPException, status, Depends
from models.consultation import ConsultationCreate, Consultation
from typing import List
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/consultations", tags=["consultations"])

# Database will be injected from server.py
consultations_collection = None

def get_db():
    """Dependency to get database collection"""
    return consultations_collection

def set_db_collection(collection):
    """Set the database collection from server.py"""
    global consultations_collection
    consultations_collection = collection


@router.post("", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_consultation(consultation_data: ConsultationCreate):
    """
    Create a new consultation request
    
    Args:
        consultation_data: Consultation form data
    
    Returns:
        Success response with consultation ID and creation time
    
    Raises:
        HTTPException: 400 for validation errors, 500 for server errors
    """
    try:
        # Create consultation object
        consultation = Consultation(
            name=consultation_data.name,
            email=consultation_data.email,
            company=consultation_data.company,
            message=consultation_data.message
        )
        
        # Insert into database
        consultation_dict = consultation.dict()
        result = await consultations_collection.insert_one(consultation_dict)
        
        if result.inserted_id:
            logger.info(f"New consultation created: {consultation.id} from {consultation.email}")
            return {
                "success": True,
                "message": "Consultation request received! We'll get back to you soon.",
                "data": {
                    "id": consultation.id,
                    "createdAt": consultation.createdAt.isoformat()
                }
            }
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create consultation request"
            )
            
    except ValueError as ve:
        logger.error(f"Validation error: {str(ve)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"success": False, "message": "Validation error", "errors": {"field": str(ve)}}
        )
    except Exception as e:
        logger.error(f"Error creating consultation: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"success": False, "message": "Server error. Please try again later."}
        )


@router.get("", response_model=dict)
async def get_consultations(skip: int = 0, limit: int = 100):
    """
    Get all consultation requests (for admin purposes)
    
    Args:
        skip: Number of records to skip
        limit: Maximum number of records to return
    
    Returns:
        List of consultations with count
    """
    try:
        # Get consultations from database
        cursor = consultations_collection.find().sort("createdAt", -1).skip(skip).limit(limit)
        consultations = await cursor.to_list(length=limit)
        
        # Count total consultations
        total_count = await consultations_collection.count_documents({})
        
        # Format response
        formatted_consultations = []
        for consultation in consultations:
            consultation['_id'] = str(consultation['_id'])
            formatted_consultations.append(consultation)
        
        return {
            "success": True,
            "data": formatted_consultations,
            "count": len(formatted_consultations),
            "total": total_count
        }
        
    except Exception as e:
        logger.error(f"Error fetching consultations: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"success": False, "message": "Server error. Please try again later."}
        )
