export default function createImagePrompt(options = {}) {
  const {
    scene = '',
    detailed = true
  } = options;

  console.log("Scene description from image analysis:", scene);
  
   const basePrompt = `Transform this photo into a Studio Ghibli style animation`;
  
   const ghibliElements = detailed ? `
   
  ` : '';

   const finalInstructions = `
    The final image should look exactly like a frame from a Studio Ghibli film - hand-drawn, with visible line work, 
    traditional cel animation aesthetic, and the unmistakable Ghibli artistic sensibility. 
    Maintain the exact same composition, expression, and key elements as the original photograph.
    IMPORTANT: Preserve the exact facial features, appearance, and characteristics of all people in the photo.
    Do not add, change, or exaggerate any ethnic or racial features. Keep the animation true to the actual 
    appearance of the individuals in the original photograph.
    This should not look like a photo with a filter applied, but a completely redrawn animation cel 
    that could be displayed in the Ghibli Museum.
  `;
 
   const prompt = `
    ${basePrompt}
    ${ghibliElements}
    ${finalInstructions}
    ${scene ? `Scene: ${scene}` : ""}
  `.trim();

  console.log("Final prompt:", prompt);

  return prompt;
}
