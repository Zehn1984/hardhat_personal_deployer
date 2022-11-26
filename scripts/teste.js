var fs = require('fs');
const fsPromises = fs.promises;

async function getObj() {
    try {
        const data = await fsPromises.readFile('../deployObject.json', 'utf8');
        const obj = JSON.parse(data);
        return obj;
    } catch (error) {
        await fsPromises.writeFile('../deployObject.json', "[]");
        const data = await fsPromises.readFile('../deployObject.json', 'utf8');
        const obj = JSON.parse(data);
        return obj;
    }
}

async function main() {
    const object = await getObj()
    object.push(1)

    console.log(object, typeof object, Array.isArray(object));

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });