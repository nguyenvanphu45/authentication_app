export const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const size = file.size / 1024 ;
            if (size > 100) {
                resolve(null)
            } else {
                resolve(reader.result)
            }
        };
        reader.onerror = (error) => reject(error);
    });
};
