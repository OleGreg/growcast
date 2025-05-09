"""change zip_code to String

Revision ID: feb3e9ac50d5
Revises: 9b307a638a45
Create Date: 2025-05-08 17:36:27.686849

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'feb3e9ac50d5'
down_revision: Union[str, None] = '9b307a638a45'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.alter_column(
        'us_cities',
        'zip_code',
        existing_type=sa.Integer(),
        type_=sa.String(),
        postgresql_using='zip_code::text'
    )


def downgrade() -> None:
    op.alter_column(
        'us_cities',
        'zip_code',
        existing_type=sa.String(),
        type_=sa.Integer(),
        postgresql_using='zip_code::integer'
    )
