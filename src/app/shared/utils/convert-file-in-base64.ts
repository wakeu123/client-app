// Fonction qui convertie un fichier en Base64

export const convertToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string)?.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}