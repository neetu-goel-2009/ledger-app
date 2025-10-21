from sqlalchemy.orm import Session
from pprint import pprint
from . import models, schemas


# Start :: library
def get_libraries(db: Session, skip: int = 0, limit: int = 100):
    db_result = db.query(models.Library).offset(skip).limit(limit).all()
    db.close()
    return db_result


def get_library_by_name(db: Session, name: str):
    db_result = db.query(models.Library).filter(models.Library.name == name).first()
    db.close()
    return db_result


def get_library_by_id(db: Session, id: int):
    db_result = db.query(models.Library).get(id)
    db.close()
    return db_result
    # return db.query(models.Library).filter(models.Library.id == id).first()


def create_library(db: Session, library: schemas.LibraryCreate):
    library = dict(library)
    db_library = models.Library(**library)
    db.add(db_library)
    db.commit()
    db.refresh(db_library)
    db.close()
    return db_library


def create_library_with_id(db: Session, library: schemas.LibraryCreateWithId):
    library = dict(library)
    db_library = models.Library(**library)
    db.add(db_library)
    db.commit()
    db.refresh(db_library)
    db.close()
    return db_library


def create_or_update_library(db: Session, library: schemas.LibraryCreate, id: int):
    db_data = get_library_by_id(db, id)
    if db_data:
        db_data = db.query(models.Library).filter(models.Library.id == id)
        db_data.update(library)
        db.commit()
        db.close()
        return { id: id, **library }
    else:
        library["id"] = id
        return create_library_with_id(db, library)
# End :: library


# Start :: library_master
def get_libraries_master(db: Session, skip: int = 0, limit: int = 200):
    db_result = db.query(models.LibraryMaster).offset(skip).limit(limit).all()
    db.close()
    return db_result


def get_library_master_by_id(db: Session, id: int):
    db_result = db.query(models.LibraryMaster).get(id)
    db.close()
    return db_result
    # return db.query(models.LibraryMaster).filter(models.LibraryMaster.id == id)


def create_library_master(db: Session, library_master: schemas.LibraryMasterCreate):
    library_master = dict(library_master)
    db_library_master = models.LibraryMaster(**library_master)
    db.add(db_library_master)
    db.commit()
    db.refresh(db_library_master)
    db.close()
    return db_library_master


def create_library_master_with_id(db: Session, library_master: schemas.LibraryMasterCreateWithId):
    library_master = dict(library_master)
    db_library_master = models.LibraryMaster(**library_master)
    db.add(db_library_master)
    db.commit()
    db.refresh(db_library_master)
    db.close()
    return db_library_master


def create_or_update_library_master(db: Session, library_master: schemas.LibraryMasterCreate, id: int):
    db_data = get_library_master_by_id(db, id)
    if db_data:
        db_data = db.query(models.LibraryMaster).filter(models.LibraryMaster.id == id)
        db_data.update(library_master)
        db.commit()
        db.close()
        return { id: id, **library_master }
    else:
        library_master["id"] = id
        return create_library_master_with_id(db, library_master)
# End :: library_master


# Start :: library_master_data
def get_libraries_master_data(db: Session, page: int = 0, limit: int = 200, site_id: int = None, library_id: int = None):
    skip = (page - 1) * limit
    filter_by = {}
    if site_id:
        filter_by["site_id"] = site_id
    if library_id:
        filter_by["library_id"] = library_id
    # print(filter_by)
    db_result = db.query(models.LibraryMasterData).filter_by(**filter_by).offset(skip).limit(limit).all()
    db.close()
    return db_result


def get_library_master_data_by_id(db: Session, id: int):
    db_result = db.query(models.LibraryMasterData).get(id)
    db.close()
    return db_result
    # return db.query(models.LibraryMaster).filter(models.LibraryMaster.id == id)


def create_library_master_data(db: Session, library_master_data: schemas.LibraryMasterDataCreate, id: int):
    db_data = get_library_master_data_by_id(db, id)
    library_master_data = dict(library_master_data)
    if db_data:
        db_data = db.query(models.LibraryMasterData).filter(models.LibraryMasterData.id == id)
        db_data.update(library_master_data)
        db.commit()
        db.close()
        return { id: id, **library_master_data }
    else:
        library_master_data["id"] = id
        return create_library_master_data_with_id(db, library_master_data)


def create_library_master_data_with_id(db: Session, library_master_data: schemas.LibraryMasterDataCreateWithId):
    library_master_data = dict(library_master_data)
    db_library_master_data = models.LibraryMasterData(**library_master_data)
    db.add(db_library_master_data)
    db.commit()
    db.refresh(db_library_master_data)
    db.close()
    return db_library_master_data


def create_or_update_library_master_data(db: Session, library_master_data: schemas.LibraryMasterDataCreate, id: int):
    db_data = get_library_master_data_by_id(db, id)
    if db_data:
        db_data = db.query(models.LibraryMasterData).filter(models.LibraryMasterData.id == id)
        db_data.update(library_master_data)
        db.commit()
        db.close()
        return { id: id, **library_master_data }
    else:
        library_master_data["id"] = id
        return create_library_master_data_with_id(db, library_master_data)
# End :: library_master_data

