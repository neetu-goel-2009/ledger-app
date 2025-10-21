from sqlalchemy.orm import Session
from pprint import pprint
from . import models, schemas


def get_documents(db: Session, skip: int = 0, limit: int = 100):
    db_result = db.query(models.Document).offset(skip).limit(limit).all()
    db.close()
    return db_result


def get_document_by_name(db: Session, name: str):
    db_result = db.query(models.Document).filter(models.Document.name == name).first()
    db.close()
    return db_result


def create_user_document(db: Session, document: schemas.DocumentCreate):
    document = dict(document)
    db_document = models.Document(**document)
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    db.close()
    return db_document


def create_document_chunck(db: Session, document_chunck: schemas.DocumentChunckCreate, document_id: int):
    try:
        document_chunck = dict(document_chunck)
        db_document_chunck = models.DocumentChunck(**document_chunck, document_id=document_id)
        db.add(db_document_chunck)
        db.commit()
        db.refresh(db_document_chunck)
        db.close()
        return db_document_chunck
    except Exception as e:
        print(db.error)
        print(str(e))
        db.close()


def get_document_chuncks(db: Session, skip: int = 0, limit: int = 100):
    db_result = db.query(models.DocumentChunck).offset(skip).limit(limit).all()
    db.close()
    return db_result


def create_document_summary(db: Session, document_summary: schemas.DocumentSummaryCreate, document_id: int):
    try:
        document_summary = dict(document_summary)
        db_document_summary = models.DocumentSummary(**document_summary, document_id=document_id)
        print('db_document_summary', db_document_summary)
        pprint(vars(db_document_summary))
        db.add(db_document_summary)
        db.commit()
        db.refresh(db_document_summary)
        db.close()
        return db_document_summary
    except Exception as e:
        print(db.error)
        print(str(e))
        db.close()


def create_document_qna(db: Session, document_qna: schemas.DocumentQnaCreate, document_id: int):
    try:
        document_qna = dict(document_qna)
        db_document_qna = models.DocumentQna(**document_qna, document_id=document_id)
        db.add(db_document_qna)
        db.commit()
        db.refresh(db_document_qna)
        db.close()
        return db_document_qna
    except Exception as e:
        print(db.error)
        print(str(e))
        db.close()

