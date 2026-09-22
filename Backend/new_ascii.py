
import shutil

align = None
text_font = []
font = "standard"
colors = {
    "black": "\033[30m",
    "red": "\033[31m",
    "green": "\033[32m",
    "yellow": "\033[33m",
    "blue": "\033[34m",
    "magenta": "\033[35m",
    "cyan": "\033[36m",
    "white": "\033[37m",
    "orange": "\033[38;5;208m",
    "pink": "\033[38;5;13m",
    "purple": "\033[38;5;93m",
    "light_blue": "\033[38;5;117m",
    "reset": "\033[0m"
}
def read_make_dict(file):
    with open(file, "r") as f:
        f.readline()
        f.readline()
        value = [
            f.readline().rstrip("\n")
            for i in range(8)
            ]
        d = {" " : value}
        for k in range(33, 127):
            value = [
                f.readline().rstrip("\n")
                for i in range(8)
                ]
            d[chr(k)] = value
            f.readline()
        k += 1
    return d
standarD= read_make_dict("standard.txt")
shadoW= read_make_dict("shadow.txt")
thinkertoY= read_make_dict("thinkertoy.txt")
def get_font(f):
    if font is None :
        return standarD

    if f.lower() == "shadow" :
        return shadoW
    elif f.lower() == "thinkertoy":
        return thinkertoY
    else :
        return standarD

def align_text(text, align):
    width = shutil.get_terminal_size().columns
    if align is None :
        return text

    if align.lower() == "left":
        return text.ljust(width)
    elif align.lower() == "right":
        return text.rjust(width)
    elif align.lower() == "center":
        return text.center(width)
    else:
        return text



def generate_ascii_art(text,font,alignment = None ,color = None):
    result = ""
    file = get_font(font)
    for i in range(8):
        line = ""
        for char in text:
            if char in file:
                c = file[char][i]
                line += c + " "

        line = align_text(line, alignment)
        result += line + "\n"
    return result

