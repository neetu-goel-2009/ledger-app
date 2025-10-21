from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sql_app.documents import crud, models, schemas
from sql_app.database import get_db, engine

models.Base.metadata.create_all(bind=engine)


router = APIRouter(
    prefix="/documents",
    tags=["documents"],
    # dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)


@router.post("/", response_model=schemas.Document)
def create_document_for_user(
    document: schemas.DocumentCreate, db: Session = Depends(get_db)
):
    print('11111111111111111111111111', type(document))
    return crud.create_user_document(db=get_db(), document=document)


@router.get("/chuncks", response_model=list[schemas.Document])
def read_document_chuncks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    chuncks = crud.get_document_chuncks(db=get_db(), skip=skip, limit=limit)
    return chuncks


@router.post("/{document_id}/chuncks/", response_model=schemas.DocumentChunck)
def create_chunck_for_document(
    document_id: int, document_chunck: schemas.DocumentChunckCreate, db: Session = Depends(get_db)
):
    return crud.create_document_chunck(db=get_db(), document_chunck=document_chunck, document_id=document_id)


@router.post("/{document_id}/summary/", response_model=schemas.DocumentSummary)
def create_summary_for_document(
    document_id: int, document_summary: schemas.DocumentSummaryCreate, db: Session = Depends(get_db)
):
    return crud.create_document_summary(db=get_db(), document_summary=document_summary, document_id=document_id)


@router.post("/{document_id}/qna/", response_model=schemas.DocumentQna)
def create_qna_for_document(
    document_id: int, document_qna: schemas.DocumentQnaCreate, db: Session = Depends(get_db)
):
    return crud.create_document_qna(db=get_db(), document_qna=document_qna, document_id=document_id)
