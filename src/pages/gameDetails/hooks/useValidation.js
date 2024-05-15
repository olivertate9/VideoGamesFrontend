function useGameValidation() {

    const validateYearReleased = (year) => {
        if (year) {
            const parsedYear = parseInt(year, 10);
            return isNaN(parsedYear)
                ? false
                : parsedYear >= 1958 && parsedYear <= 2024;
        }
    };

    const validateDeveloper = (developer) => {
        return !!developer && developer.length <= 100;
    };

    const validateTitleLength = (title) => {
        return !!title && title.length <= 100;
    };

    const validateGenre = (genre) => {
        const genreRegex = /^[a-zA-Z\s-,\.]+$/;
        return genreRegex.test(genre);
    };

    return {
        validateYearReleased,
        validateDeveloper,
        validateTitleLength,
        validateGenre,
    };
}

export default useGameValidation;
