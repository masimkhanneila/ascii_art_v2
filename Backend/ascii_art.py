import sys
import argparse


for_output = None
color = None
align = None
reverse = None
text_font = []
font = "standard"
to_print = ""
for arg in sys.argv[1:]:

    if arg.startswith("--output="):
        for_output = arg.split("=", 1)[1]

    elif arg.startswith("--color="):
        color = arg.split("=", 1)[1]

    elif arg.startswith("--align="):
        align = arg.split("=", 1)[1]
    elif arg.startswith("--reverse="):
        reverse = arg.split("=", 1)[1]
    else:
        text_font.append(arg)

if len(text_font) == 1:
    to_print = text_font[0]
    font = "standard"
    letters = None
if len(text_font) == 2 and text_font[1].lower() in ["standard", "shadow", "thinkertoy"]:
    to_print = text_font[0]
    font = text_font[1]
    letters = None
if len(text_font) == 2 and text_font[1].lower() not in ["standard", "shadow", "thinkertoy"]:
    to_print = text_font[0]
    letters = text_font[1]
    font = "standard"
if len(text_font) == 3 :
    to_print = text_font[0]
    letters = text_font[1]
    font = text_font[2]

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

def print_ascii_art(to_print,file):
    result=""
    if len(to_print) >= 14:
        print("Too many characters. Please enter less than 14 characters.")
        to_print = "Too long"
    

    for i in range(8):
        line = ""
        for char in to_print:
            if char in file:
                c = file[char][i]
                if color is not None:
                    if letters is None or char in letters:
                        c = colorize(c, color)
                line += c + " "
        line = align_text(line, align)
        result += line + "\n"
    return result

def which_font(f= "standard"):
    if f.lower() == "shadow" :
        return shadoW
    elif f.lower() == "thinkertoy":
        return thinkertoY
    else :
        return standarD

def colorize(text, color):
    return colors[color] + text + colors["reset"]

def align_text(text, align):
    if align is None:
        return text
    if align.lower() == "left":
        return text.ljust(100)
    elif align.lower() == "right":
        return text.rjust(100)
    elif align.lower() == "center":
        return text.center(100)
    else:
        return "Please choose a valid alignment."

def reverse_text(reverse):
    with open(reverse, "r") as f:
        lines = [line.rstrip("\n") for line in f]
    result = ""
    index = 0
    while index < len(lines[0]):
        found = False
        for key, value in standarD.items():
            width = len(value[0])
            block = []
            for line in lines[:8]:
                block.append(line[index:index + width])
            if block == value:
                result += key
                index += width + 1
                found = True
                break
        if not found:
            index += 1
    return result

if color is not None:
    if len(text_font) == 2:
        letters = text_font[0]
        to_print = text_font[1]
        font = "standard"
    elif len(text_font) == 3:
        letters = text_font[0]
        to_print = text_font[1]
        font = text_font[2]

    elif len(text_font) == 1:
        letters = None
        to_print = text_font[0]
        font = "standard"

else:
    if len(text_font) == 1:
        to_print = text_font[0]
        font = "standard"
        letters = None

    elif len(text_font) == 2 and text_font[1].lower() in ["standard", "shadow", "thinkertoy"]:
        to_print = text_font[0]
        font = text_font[1]
        letters = None

    elif len(text_font) == 2:
        to_print = text_font[0]
        letters = text_font[1]
        font = "standard"

    elif len(text_font) == 3:
        to_print = text_font[0]
        letters = text_font[1]
        font = text_font[2]


file = which_font(font)
result = print_ascii_art(to_print, file)

if for_output is None:
    print(result)
else:
    with open(for_output, "w") as f:
        f.write(result)
    print("File " + for_output + " was created")
if reverse is not None:
    print(reverse_text(reverse))

