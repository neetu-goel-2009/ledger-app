from fastapi import APIRouter, Depends
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from sql_app.library import crud, models, schemas
from sql_app.database import get_db, engine
from seeds.library import library as library_seed, library_master as library_master_seed, library_master_data as library_master_data_seed
from fastapi.responses import JSONResponse
import json

models.Base.metadata.create_all(bind=engine)


router = APIRouter(
    prefix="/library",
    tags=["library"],
    # dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)


# Start :: library
@router.get("/", response_model=schemas.Library)
def get_libraries(
    db: Session = Depends(get_db)
):
    result = crud.get_libraries(db=get_db())
    # return JSONResponse({ "result": "result" })
    return JSONResponse({ "result": jsonable_encoder(result) })


@router.post("/", response_model=schemas.Library)
def create_library_for_user(
    library: schemas.LibraryCreate, db: Session = Depends(get_db)
):
    return JSONResponse({ "result": jsonable_encoder(crud.create_library(db=get_db(), library=library)) })


@router.post("/seed")
def seed_library(
    # library: schemas.LibraryCreate, db: Session = Depends(get_db)
):
    print(library_seed, len(library_seed))
    result = []
    for index in range(len(library_seed)):
        id = None
        row_data = {}
        for key in library_seed[index].keys():
            if key == 'id':
                id = library_seed[index][key]
            else:
                row_data[key] = library_seed[index][key]
        result.append(crud.create_or_update_library(db=get_db(), library=row_data, id=id))
    return JSONResponse({ "result": jsonable_encoder(result) })
# End :: library


# Start :: library_master
@router.get("/master", response_model=schemas.Library)
def get_libraries_master(
    db: Session = Depends(get_db)
):
    result = crud.get_libraries_master(db=get_db())
    return JSONResponse({ "result": jsonable_encoder(result) })


@router.post("/master", response_model=schemas.LibraryMaster)
def create_library_for_user(
    library_master: schemas.LibraryMasterCreate, db: Session = Depends(get_db)
):
    return JSONResponse({ "result": jsonable_encoder(crud.create_library_master(db=get_db(), library_master=library_master)) })


@router.post("/master/seed")
def seed_library_master(
    # library: schemas.LibraryCreate, db: Session = Depends(get_db)
):
    print(library_master_seed, len(library_master_seed))
    result = []
    for index in range(len(library_master_seed)):
        id = None
        row_data = {}
        for key in library_master_seed[index].keys():
            if key == 'id':
                id = library_master_seed[index][key]
            else:
                row_data[key] = library_master_seed[index][key]
        result.append(crud.create_or_update_library_master(db=get_db(), library_master=row_data, id=id))
    return JSONResponse({ "result": jsonable_encoder(result) })
# End :: library_master


# Start :: library_data
@router.get("/master/data", response_model=schemas.LibraryMasterData)
def get_libraries_master_data(
    db: Session = Depends(get_db)
):
    result = crud.get_libraries_master_data(db=get_db())
    return JSONResponse({ "result": jsonable_encoder(result) })


@router.post("/master/data", response_model=schemas.LibraryMasterData)
def create_library_master_data(
    library_master_data: schemas.LibraryMasterDataCreateWithId, db: Session = Depends(get_db)
):
    library_master_data_dict = dict(library_master_data)
    id = None
    if "id" in library_master_data_dict:
        id = library_master_data_dict["id"]
    return JSONResponse({ "result": jsonable_encoder(crud.create_library_master_data(db=get_db(), library_master_data=library_master_data, id=id)) })


@router.get("/master/data/{site_id}/{library_id}", response_model=schemas.LibraryMasterData)
def get_libraries_master_data_filter(
    site_id: int = None, library_id: int = None, page: int = 1, limit: int = 10, db: Session = Depends(get_db)
):
    return JSONResponse({ "result": jsonable_encoder(crud.get_libraries_master_data(db=get_db(), page=page, limit=limit, site_id=site_id, library_id=library_id)) })


@router.post("/master/data/seed")
def seed_library_master_data(
    # library: schemas.LibraryCreate, db: Session = Depends(get_db)
):
    print(library_master_data_seed, len(library_master_data_seed))
    result = []
    for index in range(len(library_master_data_seed)):
        id = None
        row_data = {}
        for key in library_master_data_seed[index].keys():
            if key == 'id':
                id = library_master_data_seed[index][key]
            else:
                row_data[key] = library_master_data_seed[index][key]
        result.append(crud.create_or_update_library_master_data(db=get_db(), library_master_data=row_data, id=id))
    return JSONResponse({ "result": jsonable_encoder(result) })
# End :: library_data