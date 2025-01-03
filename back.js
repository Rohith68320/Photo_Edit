document.addEventListener("DOMContentLoaded", () => 
{
    const input = document.querySelector(".file-input");
    const filters = document.querySelectorAll(".filter button");
    const preview = document.querySelector(".preview-img img");
    const filterName = document.querySelector(".filter-info .name");
    const filterValue = document.querySelector(".filter-info .value");
    const rotateOptions = document.querySelectorAll(".rotate button");
    const slider = document.querySelector(".slider input");
    const choose = document.querySelector(".choose-img");
    const save = document.querySelector(".save-img");

    let brightness = 100, saturation = 100, inversion = 0, grayscale = 0, contrast = 100, opacity = 100, sepia = 0, blur = 0, hue = 0
    let rotate = 0, horizontal = 1, vertical = 1;

    const applyfilters = () =>
    {
        preview.style.transform = `rotate(${rotate}deg) scale(${horizontal}, ${vertical})`
        preview.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) contrast(${contrast}%) sepia(${sepia}%) hue-rotate(${hue}deg) blur(${blur}px) opacity(${opacity}%)`
    }

    const loadImage = () => 
    {
        let file = input.files[0];
        if (!file) return;
        preview.src = URL.createObjectURL(file);
        document.querySelector(".container").classList.remove("disable");
    };

    filters.forEach(option => 
    {
        option.addEventListener("click", () => 
        {
            const activeFilter = document.querySelector(".filter .active");
            if (activeFilter) activeFilter.classList.remove("active");
            option.classList.add("active");
            filterName.innerText = option.innerText;

            if (option.id === "brightness") 
            {
                slider.max = "200";
                slider.value = brightness;
                filterValue.innerText = `${brightness}%`;
            } 
            else if (option.id === "saturation") 
            {
                slider.max = "200";   
                slider.value = saturation; 
                filterValue.innerText = `${saturation}%`;
            } 
            else if (option.id === "inversion") 
            {
                slider.max = "100";
                slider.value = inversion; 
                filterValue.innerText = `${inversion}%`;
            } 
            else if (option.id === "grayscale") 
            {
                slider.max = "100";
                slider.value = grayscale;
                filterValue.innerText = `${grayscale}%`;
            }
            else if (option.id === "contrast") 
            {
                slider.max = "200";   
                slider.value = contrast; 
                filterValue.innerText = `${contrast}%`;
            } 
            else if (option.id === "sepia") 
            {
                slider.max = "100";   
                slider.value = sepia; 
                filterValue.innerText = `${sepia}%`;
            }
            else if (option.id === "blur") 
            {
                slider.max = "100";   
                slider.value = blur; 
                filterValue.innerText = `${blur}%`;
            }
            else if (option.id === "opacity") 
            {
                slider.max = "100";   
                slider.value = opacity; 
                filterValue.innerText = `${opacity}%`;
            }
            else if (option.id === "hue") 
            {
                slider.max = "100";   
                slider.value = hue; 
                filterValue.innerText = `${hue}%`;
            }
        });
    });

    rotateOptions.forEach(option =>
    {
        option.addEventListener("click", () => 
        {
            if(option.id === "left")
            {
                rotate -= 90;
            }
            if(option.id === "horizontal")
            {
                horizontal = horizontal === 1 ? -1 : 1
            }
            if(option.id === "vertical")
            {
                vertical = vertical === 1 ? -1 : 1
            }

            applyfilters();
        })
    }
    )

    const updateFilter = () => 
    {
        filterValue.innerText = `${slider.value}%`;
        const selectedFilter = document.querySelector(".filter .active");

        if (selectedFilter.id === "brightness") brightness = slider.value
        else if (selectedFilter.id === "saturation") saturation = slider.value
        else if (selectedFilter.id === "inversion") inversion = slider.value
        else if (selectedFilter.id === "grayscale") grayscale = slider.value
        else if (selectedFilter.id === "sepia") sepia = slider.value
        else if (selectedFilter.id === "opacity") opacity = slider.value
        else if (selectedFilter.id === "contrast") contrast = slider.value
        else if (selectedFilter.id === "hue") hue = slider.value
        else if (selectedFilter.id === "blur") blur = slider.value
        
        applyfilters();
    };

    const saveimg = () =>
    {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = preview.naturalWidth;
        canvas.height = preview.naturalHeight;

        ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) contrast(${contrast}%) sepia(${sepia}%) hue-rotate(${hue}deg) blur(${blur}px) opacity(${opacity}%)`
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.scale(horizontal, vertical);
        ctx.drawImage(preview, -canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
        
        const link = document.createElement("a");
        link.download = "image.jpg";
        link.href = canvas.toDataURL();
        link.click();
    }

    if (input) input.addEventListener("change", loadImage);
    if (slider) slider.addEventListener("input", updateFilter);
    if(save)  save.addEventListener("click", saveimg);
    if (choose) choose.addEventListener("click", () => input.click());
});
