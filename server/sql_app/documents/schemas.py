from pydantic import BaseModel


class DocumentBase(BaseModel):
    name: str
    size: str
    path: str
    type: str
    vector_index: str
    owner_id: int


class DocumentCreate(DocumentBase):
    status: str = 'active'


class Document(DocumentBase):
    id: int

    # class Config:
    #     from_attributes = True


class DocumentChunckBase(BaseModel):
    page_content: dict
    page_metadata: dict


class DocumentChunckCreate(DocumentChunckBase):
    pass


class DocumentChunck(DocumentChunckBase):
    id: int
    document_id: int

    class Config:
        from_attributes = True


class DocumentSummaryBase(BaseModel):
    summary: dict


class DocumentSummaryCreate(DocumentSummaryBase):
    pass


class DocumentSummary(DocumentSummaryBase):
    id: int
    document_id: int

    class Config:
        from_attributes = True




class DocumentQnaBase(BaseModel):
    question: str
    response: dict


class DocumentQnaCreate(DocumentQnaBase):
    pass


class DocumentQna(DocumentQnaBase):
    id: int
    document_id: int

    class Config:
        from_attributes = True
