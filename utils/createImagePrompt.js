const AVAILABLE_STYLES = {
  pixar: "Pixar 3D animation",
  disney: "Disney 3D animation",
  dreamworks: "DreamWorks 3D animation",
  illumination: "Illumination 3D animation",
  ghibli: "Studio Ghibli 2D anime"
};

const AVAILABLE_MOODS = {
  cheerful: "cheerful",
  natural: "natural",
  whimsical: "whimsical",
  magical: "magical",
  playful: "playful",
  heartwarming: "heartwarming",
  dramatic: "dramatic",
  mysterious: "mysterious",
  calm: "calm"
};

const DEFAULT_STYLE = 'ghibli';
const DEFAULT_MOOD = 'cheerful';

const styleInstructions = {
  pixar: `
    - Use Pixar's signature 3D style with detailed texturing
    - Create expressive characters with exaggerated features
    - Apply cinematic lighting with strong contrasts
    - Use rich, slightly saturated color palette
    - Add subtle details and textures to surfaces
  `,
  disney: `
    - Use Disney's smooth 3D animation style
    - Draw characters with big expressive eyes and animated facial features
    - Apply magical, fantasy-like lighting effects
    - Use vibrant, storybook color palette
    - Make characters appear slightly more youthful
    - Reference the style of "Frozen", "Moana", or "Tangled"
  `,
  dreamworks: `
    - Apply DreamWorks' bold character design approach
    - Use dramatic lighting and dynamic poses
    - Create expressive facial features with exaggerated emotions
    - Use rich, contrasting colors with dramatic shadows
    - Reference films like "How to Train Your Dragon" or "Shrek"
  `,
  illumination: `
    - Use Illumination's smooth textures and simplified forms
    - Create characters with exaggerated expressions and rounded shapes
    - Apply bright, vibrant colors with high saturation
    - Add smooth, minimal shadows and high-contrast lighting
    - Reference the style of "Despicable Me" or "The Secret Life of Pets"
  `,
  ghibli: `
    - Draw with signature large Ghibli eyes and simplified noses
    - Make characters appear more youthful and innocent
    - Apply soft, hand-drawn linework with visible brushstrokes
    - Use watercolor-style backgrounds with soft depth
    - Apply pastel and earth tone palette of Miyazaki films
    - Capture the magical, childlike wonder of Ghibli
    - The image should look like a still from an anime film
  `
};

function createImagePrompt(options = {}) {
  const {
    scene = '',
    style = DEFAULT_STYLE,
    mood = DEFAULT_MOOD,
    detailed = true
  } = options;

  const baseStyle = AVAILABLE_STYLES[style.toLowerCase()] || style;
  const moodValue = AVAILABLE_MOODS[mood.toLowerCase()] || mood;
  const styleGuide = styleInstructions[style.toLowerCase()] || '';

  let prompt = `Recreate this scene as an authentic ${baseStyle} illustration with a ${moodValue} mood. 
Do not add, remove, or change any people, objects, or features from the original scene. 
The generated image must be an exact artistic recreation of the original photo, only changing the visual style. 
Do not invent or imagine anything that is not present in the original.`;

  if (detailed) {
    prompt += `\nSTYLE INSTRUCTIONS:\n${styleGuide}\nMAINTAIN: Preserve all people, expressions, and key elements from the scene.`;
  }

  prompt += `\n\nSCENE: ${scene}`;

  return prompt.trim();
}

export default {
  createImagePrompt,
  DEFAULT_STYLE,
  DEFAULT_MOOD
};
