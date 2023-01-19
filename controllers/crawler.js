import axios from "axios"
import { load } from 'cheerio';

async function getRecipe(req, res) {
  try {
		const { data } = await axios.get(
			req.body.url
		);
		const $ = load(data);
		const recipeData = [];
    let recipeString = ""
    let recipeObj

		$('script').each((_idx, el) => {
			const recipe = $(el).text()
			recipeData.push(recipe)
		});
    recipeData.forEach(function(recipe) {
      if(recipe.includes(`"@context":"http://schema.org","@type":"Recipe"`)) {
        recipeString = recipeData[recipeData.indexOf(recipe)]
      }
    })
    console.log(JSON.parse(recipeString))
    recipeObj = JSON.parse(recipeString)
    let instructionsArr = []
    recipeObj.recipeInstructions.forEach(function(instruction) {
      instructionsArr.push(instruction.text)
    })
    recipeObj.recipeInstructions = instructionsArr.join("\r\n")
    recipeObj.recipeIngredient = recipeObj.recipeIngredient.join("\r\n")
    res.render('recipes/import', {
      title: "Import Recipe",
      recipeObj
    })
	} 
  catch (error) {
    res.render('importerror', {
      title: "Import Error"
    })
		//throw error;//needs redirect to import error page
	}
}



// const getRecipe = async () => {
// 	try {
// 		const { data } = await axios.get(
// 			'https://rainbowplantlife.com/vegan-red-lentil-curry/'
// 		);
// 		const $ = load(data);
// 		const recipeData = [];

// 		$('script').each((_idx, el) => {
// 			const recipe = $(el).text()
// 			recipeData.push(recipe)
// 		});
//     console.log(recipeData)
// 		return recipeData;
// 	} catch (error) {
// 		throw error;
// 	}
// };

export {
  getRecipe
}
