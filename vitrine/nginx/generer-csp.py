"""Produit la politique CSP Nginx de chaque fichier HTML émis par Astro."""

from base64 import b64encode
from hashlib import sha256
from html.parser import HTMLParser
from pathlib import Path
import re
import sys


def empreinte(texte):
    """Encode le texte UTF-8 tel que le navigateur le lit."""
    return "'sha256-" + b64encode(sha256(texte.encode("utf-8")).digest()).decode("ascii") + "'"


class ContenuIntegre(HTMLParser):
    """Collecte les scripts, les feuilles de style et les attributs compilés."""

    def __init__(self):
        super().__init__()
        self.scripts = set()
        self.styles = set()
        self.attributs = set()
        self.bloc = None
        self.texte = []

    def handle_starttag(self, tag, attrs):
        attributs = dict(attrs)
        if attributs.get("style"):
            self.attributs.add(empreinte(attributs["style"]))
        if tag == "style" or (tag == "script" and "src" not in attributs):
            self.bloc = tag

    def handle_data(self, data):
        if self.bloc:
            self.texte.append(data)

    def handle_endtag(self, tag):
        if self.bloc != tag:
            return
        cible = self.scripts if tag == "script" else self.styles
        cible.add(empreinte("".join(self.texte)))
        self.bloc = None
        self.texte.clear()


def politique(contenu):
    """Autorise les ressources locales et les seuls fragments reconnus."""
    scripts = " ".join(["'self'", *sorted(contenu.scripts)])
    styles = " ".join(["'self'", *sorted(contenu.styles)])
    attributs = (
        " ".join(["'unsafe-hashes'", *sorted(contenu.attributs)])
        if contenu.attributs else "'none'"
    )
    return "; ".join((
        "default-src 'none'",
        f"script-src {scripts}",
        "script-src-attr 'none'",
        f"style-src {styles}",
        f"style-src-attr {attributs}",
        "img-src 'self'",
        "font-src 'self'",
        "media-src 'self'",
        "base-uri 'none'",
        "frame-ancestors 'none'",
        "object-src 'none'",
        "form-action 'none'",
    ))


def produire(racine):
    """Associe la politique au chemin de fichier après résolution de l'index."""
    if not (racine / "index.html").is_file():
        raise SystemExit("dist/index.html absent : compiler la vitrine avant de construire l'image.")
    print("map $uri $politique_vitrine {")
    print(f'    default "{politique(ContenuIntegre())}";')
    for page in sorted(racine.rglob("*.html")):
        chemin = "/" + page.relative_to(racine).as_posix()
        if any(caractere in chemin for caractere in '\n\r"\\$'):
            raise ValueError(f"Chemin HTML incompatible avec la configuration Nginx : {chemin!r}")
        contenu = ContenuIntegre()
        contenu.feed(page.read_text(encoding="utf-8"))
        contenu.close()
        # Le motif est sensible à la casse, comme les chemins Linux.
        print(f'    "~^{re.escape(chemin)}$" "{politique(contenu)}";')
    print("}")


if __name__ == "__main__":
    produire(Path(sys.argv[1]))
