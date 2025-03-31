export default function createImagePrompt(options = {}) {
  const {
    scene = '',
    style = '',
    mood = '',
    detailed = true
  } = options;

  console.log("Scene description from image analysis:", scene);
  
   const basePrompt = `Transform this photo into a Studio Ghibli style animation`;
  
   const ghibliElements = detailed ? `
    with Ghibli's signature hand-drawn animation style,
    soft watercolor backgrounds,
    vibrant color palette,
    attention to natural elements and details,
    whimsical character design,
    and dreamlike atmosphere
  ` : '';

   const styleReference = style ? `
    in the distinctive style of ${style} (Studio Ghibli film),
  ` : '';

   const moodElement = mood ? `with a ${mood} atmosphere,` : '';

   const sceneDescription = scene ? `The photo shows: ${scene}.` : '';
 
   const prompt = `
    ${basePrompt}
    ${ghibliElements}
    ${styleReference}
    ${moodElement}
    ${sceneDescription}
    Create a high-quality, detailed Ghibli-inspired artwork that faithfully represents the original photo.
  `.replace(/\s+/g, ' ').trim();

  console.log("Final prompt:", prompt);

  return prompt;
}


 