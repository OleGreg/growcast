"""Drop and create zip_code as String

Revision ID: bda13d24e9fd
Revises: feb3e9ac50d5
Create Date: 2025-05-08 17:45:51.314981

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'bda13d24e9fd'
down_revision: Union[str, None] = 'feb3e9ac50d5'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
