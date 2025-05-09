"""Drop and recreate zip_code as String

Revision ID: ef3da3e81119
Revises: bda13d24e9fd
Create Date: 2025-05-08 17:49:25.605243

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ef3da3e81119'
down_revision: Union[str, None] = 'bda13d24e9fd'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    # Drop the existing zip_code column
    op.drop_column('us_cities', 'zip_code')
    
    # Add it back as a String (nullable for now)
    op.add_column('us_cities', sa.Column('zip_code', sa.String(), nullable=True))

def downgrade():
    # Drop the string version
    op.drop_column('us_cities', 'zip_code')
    
    # Add it back as Integer
    op.add_column('us_cities', sa.Column('zip_code', sa.Integer(), nullable=True))