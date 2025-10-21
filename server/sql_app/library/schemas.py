from pydantic import BaseModel
import datetime


# Start :: library
class LibraryBase(BaseModel):
    name: str
    type: str
    info: dict


class LibraryCreate(LibraryBase):
    status: str = 'active'


class Library(LibraryBase):
    id: int


class LibraryCreateWithId(LibraryCreate):
    id: int
# End :: library


# Start :: library_master
class LibraryMasterBase(BaseModel):
    name: str
    variant: str
    value: str
    value_type: str
    info: dict


class LibraryMasterCreate(LibraryMasterBase):
    status: str = 'active'


class LibraryMaster(LibraryMasterBase):
    id: int


class LibraryMasterCreateWithId(LibraryMasterCreate):
    id: int
# End :: library_master


# Start :: library_master_data
class LibraryMasterDataBase(BaseModel):
    quantity: float
    price: float
    createdon: str = datetime.datetime.now()
    version: int = 1
    parent_id: int = 0
    info: dict = {}
    misc: dict = {}
    site_id: int | str
    vendor_id: int | str
    library_id: int
    library_master_id: int


class LibraryMasterDataCreate(LibraryMasterDataBase):
    status: str = 'active'


class LibraryMasterData(LibraryMasterDataBase):
    id: int


class LibraryMasterDataCreateWithId(LibraryMasterDataCreate):
    id: int = None
# End :: library_master_data