from __future__ import with_statement
import logging
from logging.config import fileConfig
from flask import current_app
from alembic import context

config = context.config
fileConfig(config.config_file_name)
logger = logging.getLogger('alembic.env')

def get_engine():
    return current_app.extensions['migrate'].db.engines

def get_metadata():
    return current_app.extensions['migrate'].db.metadata
