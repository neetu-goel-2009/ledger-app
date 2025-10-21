from typing import List
from sqlalchemy import Column, ForeignKey, Integer, String, JSON, Double, DateTime
from sqlalchemy.orm import relationship

from sql_app.database import Base


# Start :: library
class Library(Base):
    __tablename__ = "library"

    id = Column(Integer, primary_key=True)
    name = Column(String, index=True)
    type = Column(String)
    status = Column(String, index=True)
    info = Column(JSON, nullable=True)

    master = relationship("LibraryMaster", back_populates="library", primaryjoin="Library.id == LibraryMaster.library_id")
    master_data = relationship("LibraryMasterData", back_populates="library", primaryjoin="Library.id == LibraryMasterData.library_id")
# End :: library


# Start :: library_master
class LibraryMaster(Base):
    __tablename__ = "library_master"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    variant = Column(String, nullable=True)
    value = Column(String, nullable=True)
    value_type = Column(String, nullable=True)
    info = Column(JSON, nullable=True)
    status = Column(String, default="active", index=True)
    library_id = Column(Integer, ForeignKey("library.id"), index=True)

    library = relationship("Library", back_populates="master", primaryjoin="Library.id == LibraryMaster.library_id")
    library_data = relationship("LibraryMasterData", back_populates="library_master", primaryjoin="LibraryMaster.id == LibraryMasterData.library_master_id")
    site_data = relationship("LibraryMasterData", back_populates="site_master", primaryjoin="LibraryMaster.id == LibraryMasterData.site_id")
    vendor_data = relationship("LibraryMasterData", back_populates="vendor_master", primaryjoin="LibraryMaster.id == LibraryMasterData.vendor_id")
# End :: library_master


# Start :: library_master_data
class LibraryMasterData(Base):
    __tablename__ = "library_master_data"

    id = Column(Integer, primary_key=True)
    quantity = Column(Double, nullable=True)
    price = Column(Double, default=0)
    createdon = Column(DateTime, nullable=False)
    version = Column(Integer, default=1)
    parent_id = Column(Integer, default=0, index=True)
    info = Column(JSON, nullable=True)
    misc = Column(JSON, nullable=True)
    status = Column(String, default="active", index=True)
    site_id = Column(Integer, ForeignKey("library_master.id"), index=True, nullable=True)
    vendor_id = Column(Integer, ForeignKey("library_master.id"), index=True, nullable=True)
    library_id = Column(Integer, ForeignKey("library.id"), index=True)
    library_master_id = Column(Integer, ForeignKey("library_master.id"), index=True)

    library = relationship("Library", back_populates="master_data", primaryjoin="Library.id == LibraryMasterData.library_id")
    library_master = relationship("LibraryMaster", back_populates="library_data", primaryjoin="LibraryMaster.id == LibraryMasterData.library_master_id")
    site_master = relationship("LibraryMaster", back_populates="site_data", primaryjoin="LibraryMaster.id == LibraryMasterData.site_id")
    vendor_master = relationship("LibraryMaster", back_populates="vendor_data", primaryjoin="LibraryMaster.id == LibraryMasterData.vendor_id")
# End :: library_master_data
