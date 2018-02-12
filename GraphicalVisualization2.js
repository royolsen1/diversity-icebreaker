function convertPaperScore(paperScore) {
    let paperScoreBlueAbsolute = paperScore.blue; // Kun eksempelverdier. Disse tre byttes med hva brukeren skriver inn.
    let paperScoreRedAbsolute = paperScore.red;
    let paperScoreGreenAbsolute = paperScore.green;

    const paperScoreSumAbsolute = paperScoreBlueAbsolute + paperScoreRedAbsolute + paperScoreGreenAbsolute;

    let paperScoreBlue = paperScoreBlueAbsolute / paperScoreSumAbsolute;
    let paperScoreRed = paperScoreRedAbsolute / paperScoreSumAbsolute;
    let paperScoreGreen = paperScoreGreenAbsolute / paperScoreSumAbsolute;

    const paperScoreBlueAverage = 31 / 84;
    const paperScoreRedAverage = 28 / 84;
    const paperScoreGreenAverage = 25 / 84;

    const paperScoreBlueSD15 = 7 / (15 * 84);
    const paperScoreRedSD15 = 6.5 / (15 * 84);
    const paperScoreGreenSD15 = 6.5 / (15 * 84);

    let paperScoreBlueStandardized = cutScore(50 + (paperScoreBlue - paperScoreBlueAverage) / paperScoreBlueSD15);
    let paperScoreRedStandardized = cutScore(50 + (paperScoreRed - paperScoreRedAverage) / paperScoreRedSD15);
    let paperScoreGreenStandardized = cutScore(50 + (paperScoreGreen - paperScoreGreenAverage) / paperScoreGreenSD15);

    let standardizedSum = paperScoreBlueStandardized + paperScoreRedStandardized + paperScoreGreenStandardized;
    console.log(paperScoreBlueStandardized, paperScoreRedStandardized, paperScoreGreenStandardized, standardizedSum);
    paperScore.blue = Math.round(150 * paperScoreBlueStandardized / standardizedSum);
    paperScore.red = Math.round(150 * paperScoreRedStandardized / standardizedSum);
    paperScore.green = Math.round(150 * paperScoreGreenStandardized / standardizedSum);
    //return { red: finalScoreRed, blue: finalScoreBlue, green: finalScoreGreen };

    function cutScore(score) {
        if (score > 95) return 95;
        if (score < 10) return 10;
        return score;
    }
}