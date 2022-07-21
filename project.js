let canvas = document.getElementById("MyCan");
let ctx = canvas.getContext("2d");

//load one image function
function load_image(src,callback)
{
    let img = document.createElement("img");
    img.onload = () => callback(img);
    img.src = src;
}

// for create a path 
function createPath(animation,framNum)
{
    return "images/" + animation + "/" + framNum + ".png"
}

let fram_obj = {
    idle : [1,2,3,4,5,6,7,8],
    kick : [1,2,3,4,5,6,7],
    punch : [1,2,3,4,5,6,7],
    backward : [1,2,3,4,5,6],
    forward : [1,2,3,4,5,6],
    block : [1,2,3,4,5,6,7,8,9]
}

// first load the all images

function loadAllImages(callback)
{
    let images = {
        idle : [],
        kick : [],
        punch : [],
        backward : [],
        forward : [],
        block : []
    }
    let imageToLoad = 0;

    ["idle","punch","block","kick","backward","forward"].forEach((animation) => {
       let animationFram = fram_obj[animation];
       imageToLoad = imageToLoad + animationFram.length;

       animationFram.forEach((framnum) => {
        let path = createPath(animation,framnum);


        load_image(path,(image) => {
            images[animation][framnum - 1 ] = image;
            imageToLoad = imageToLoad -1;

            if(imageToLoad === 0)
            {
                callback(images);
            }

        })
       })

    })
}


function animate(ctx,images,animation,callback)
{
    images[animation].forEach((image,index) => {
        setTimeout(() => {
            ctx.clearRect(0,0,500,500)
            ctx.drawImage(image,0,0,500,500);
        }, index*100);
    })

    setTimeout(callback,images[animation].length * 100);
}


loadAllImages((images) => {
    let Queue = []

    function recurtion()
    {
        let selected;

        if(Queue.length === 0)
        {
            selected = "idle";
        }
        else{
            selected = Queue.shift();
        }

        animate(ctx,images,selected,recurtion)
    }

    recurtion();

    document.getElementById("kick").onclick = function(){
        Queue.push("kick");
    }

    document.getElementById("punch").onclick = function(){
        Queue.push("punch");
    }

    document.getElementById("backward").onclick = function(){
        Queue.push("backward");
    }

    document.getElementById("forward").onclick = function(){
        Queue.push("forward");
    }

    document.getElementById("block").onclick = function(){
        Queue.push("block");
    }

    document.addEventListener("keydown",(event) => {
        let key = event.key;

        if(key == "k")
        {
            Queue.push("kick");
        }
        else if(key == "p")
        {
            Queue.push("punch");
        }
        else if(key == "b")
        {
            Queue.push("backward");
        }
        else if(key == "f")
        {
            Queue.push("forward");
        }
        else if(key == " ")
        {
            Queue.push("block");
        }
    })
})

