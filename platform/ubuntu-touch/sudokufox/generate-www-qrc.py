#!/usr/bin/python3

"""
Generate file www/www.qrc

Run this script AFTER populating www with your html files
"""

import os
from pathlib import Path

ROOT = Path(os.path.dirname(__file__))
os.chdir(ROOT / 'www')

WWW  = '.'
QRC  = 'www.qrc'

def list_all_files():
    for raw_root, dirnames, filenames in os.walk(WWW):
        root = Path(raw_root)
        for fpath in filenames:
            yield root / fpath

template_begin = """
<RCC>
  <qresource prefix="/">"""

template_file = "<file>{path}</file>"

template_end = """
  </qresource>
</RCC>
"""


print(f"QRC generator: Generating {QRC}")

with open(QRC, 'w') as fout:
    fout.write(template_begin)

    for path in list_all_files():
        print(f"QRC generator: Foud www resource {path}")
        fout.write(template_file.format(path=path))

    fout.write(template_end)

print("QRC generator: DONE")
