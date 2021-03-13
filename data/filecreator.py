import json

def run():
    data = None
    tag_data = None

    with open('gameData.json') as f:
        data = json.load(f)

    print(data);

    with open('tags.json') as f:
        tag_data = json.load(f)

    print()
    print(tag_data)
    
    game_name = input('enter game name: ')
    tags = []

    uinput = ''
    while(True):
        uinput = input('enter tag: ')
        if uinput == 'q':
            break
        tags.append(uinput)
        print('current tags: '+str(tags))

    for tag in tags:
        if tag not in tag_data:
            tag_data[tag] = []
        tag_data[tag].append(game_name)

    new_data = {}
    new_data['name'] = game_name
    new_data['description'] = ''
    new_data['tags'] = tags

    data['games'].append(new_data)

    with open('gameData.json', 'w') as f:
        f.write(json.dumps(data, indent=4))

    with open('tags.json', 'w') as f:
        f.write(json.dumps(tag_data, indent=4))

while(True):
    run()
    if input('again?') == 'n':
        break
