export const story = {
  magical: [
    {
      id: 1,
      scenario: "You find yourself in a serene forest. What do you do?",
      imagePrompt:
        "An illustration of a mystical forest at twilight, with a soft, diffused lighting that casts gentle shadows. The atmosphere is serene and misty, with a low camera angle that emphasizes the towering ancient trees and the luminescent path winding through the undergrowth. Fireflies provide a magical, twinkling effect in the air.",
      answers: [
        "Explore the path",
        "Sit and meditate",
        "Take photos",
        "Leave immediately",
      ],
    },
    {
      id: 2,
      scenario: "You encounter a small, lost animal. How do you react?",
      imagePrompt:
        "A detailed illustration showing a close-up of a small, enchanted creature with large, sparkling eyes. The lighting is soft and focused, highlighting the creature's hopeful expression against a blurred, mystical forest background. The atmosphere is calm yet slightly mysterious.",
      answers: [
        "Help it find its way",
        "Ignore it",
        "Call for help",
        "Capture it",
      ],
    },
    {
      id: 3,
      scenario:
        "You come across a mysterious door in the forest. What do you do?",
      imagePrompt:
        "An illustration depicting a mysterious door with intricate carvings, set in the middle of a dense, foggy forest. The lighting is dramatic, with a spotlight effect on the door, casting long shadows and creating a sense of intrigue. The camera angle is slightly above, looking down at the door, surrounded by eerie, whispering trees.",
      answers: [
        "Open the door",
        "Knock and wait",
        "Walk away",
        "Call out to see if anyone responds",
      ],
    },
    {
      id: 4,
      scenario: "You find a treasure chest. What is your first action?",
      imagePrompt:
        "An illustration with a focus on a treasure chest, its ornate metalwork reflecting a soft, ethereal glow. The lighting is warm and inviting, with a low camera angle that makes the chest appear grand. The atmosphere is filled with a sense of wonder, enhanced by the surrounding lush ferns and the subtle sparkle of hidden gems.",
      answers: [
        "Open it",
        "Check for traps",
        "Guard it",
        "Call friends to share",
      ],
    },
    {
      id: 5,
      scenario:
        "You meet a wise old man who offers you a choice of gifts. What do you choose?",
      imagePrompt:
        "An illustration showing a wise old man in a serene, forest clearing, with soft, natural lighting that highlights his gentle smile and the mystical items he offers. The camera captures a balanced composition, with the sage in the foreground and the forest as a mystical backdrop. The atmosphere is peaceful and wise, with a hint of magic in the air.",
      answers: [
        "A book of wisdom",
        "A bag of gold",
        "A map to a hidden place",
        "A magical amulet",
      ],
    },
  ],
  scifi: [
    {
      id: 1,
      scenario:
        "You wake up in a spaceship with no memory. What's your first move?",
      imagePrompt:
        "An illustration of a futuristic spaceship interior, with sleek, metallic surfaces and blinking control panels. The lighting is cool and blue, casting sharp shadows and highlighting the protagonist's confused expression.",
      answers: [
        "Check the ship's logs", // Openness
        "Explore the ship", // Extraversion
        "Try to restore your memory", // Neuroticism
        "Send a distress signal", // Conscientiousness
      ],
    },
    {
      id: 2,
      scenario: "You encounter a malfunctioning robot. How do you react?",
      imagePrompt:
        "A detailed illustration showing a close-up of a malfunctioning robot with sparks flying. The lighting is dramatic, highlighting the robot's damaged circuitry.",
      answers: [
        "Try to fix it", // Conscientiousness
        "Avoid it", // Neuroticism
        "Communicate with it", // Openness
        "Call for help", // Agreeableness
      ],
    },
    {
      id: 3,
      scenario:
        "You find a locked door leading to an unknown area. What do you do?",
      imagePrompt:
        "An illustration depicting a mysterious door with advanced security systems. The lighting is focused on the door, creating a sense of mystery and anticipation.",
      answers: [
        "Pick the lock", // Openness
        "Knock and wait", // Agreeableness
        "Walk away", // Neuroticism
        "Search for a key", // Conscientiousness
      ],
    },
    {
      id: 4,
      scenario:
        "You discover a new planet through the ship's window. What's your reaction?",
      imagePrompt:
        "An illustration with a focus on a panoramic view of a new planet, its colors vibrant and landscapes alien. The lighting is soft, enhancing the wonder of the discovery.",
      answers: [
        "Plan an expedition", // Openness
        "Share the news with others", // Extraversion
        "Research it thoroughly", // Conscientiousness
        "Worry about potential dangers", // Neuroticism
      ],
    },
    {
      id: 5,
      scenario:
        "You meet an alien species offering a rare technology. What do you choose?",
      imagePrompt:
        "An illustration showing an alien species in a peaceful, technologically advanced setting, with soft, natural lighting that highlights the advanced technology they offer.",
      answers: [
        "A device that enhances creativity", // Openness
        "A device that ensures safety", // Conscientiousness
        "A device that facilitates social connections", // Extraversion
        "A device that reduces anxiety", // Neuroticism
      ],
    },
  ],
  fantasy: [
    {
      id: 1,
      scenario: "You find yourself in a magical forest. What do you do?",
      imagePrompt:
        "An illustration of a mystical forest at twilight, with a soft, diffused lighting that casts gentle shadows. The atmosphere is serene and misty, with a low camera angle that emphasizes the towering ancient trees and the luminescent path winding through the undergrowth.",
      answers: [
        "Explore the path", // Openness
        "Sit and meditate", // Neuroticism
        "Take photos", // Conscientiousness
        "Leave immediately", // Neuroticism
      ],
    },
    {
      id: 2,
      scenario: "You encounter a small, lost animal. How do you react?",
      imagePrompt:
        "A detailed illustration showing a close-up of a small, enchanted creature with large, sparkling eyes. The lighting is soft and focused, highlighting the creature's hopeful expression against a blurred, mystical forest background.",
      answers: [
        "Help it find its way", // Agreeableness
        "Ignore it", // Neuroticism
        "Call for help", // Conscientiousness
        "Capture it", // Neuroticism
      ],
    },
    {
      id: 3,
      scenario:
        "You come across a mysterious door in the forest. What do you do?",
      imagePrompt:
        "An illustration depicting a mysterious door with intricate carvings, set in the middle of a dense, foggy forest. The lighting is dramatic, with a spotlight effect on the door, casting long shadows and creating a sense of intrigue.",
      answers: [
        "Open the door", // Openness
        "Knock and wait", // Agreeableness
        "Walk away", // Neuroticism
        "Call out to see if anyone responds", // Extraversion
      ],
    },
    {
      id: 4,
      scenario: "You find a treasure chest. What is your first action?",
      imagePrompt:
        "An illustration with a focus on a treasure chest, its ornate metalwork reflecting a soft, ethereal glow. The lighting is warm and inviting, with a low camera angle that makes the chest appear grand.",
      answers: [
        "Open it", // Openness
        "Check for traps", // Conscientiousness
        "Guard it", // Neuroticism
        "Call friends to share", // Extraversion
      ],
    },
    {
      id: 5,
      scenario:
        "You meet a wise old man who offers you a choice of gifts. What do you choose?",
      imagePrompt:
        "An illustration showing a wise old man in a serene, forest clearing, with soft, natural lighting that highlights his gentle smile and the mystical items he offers.",
      answers: [
        "A book of wisdom", // Openness
        "A bag of gold", // Conscientiousness
        "A map to a hidden place", // Extraversion
        "A magical amulet", // Neuroticism
      ],
    },
  ],
  mystery: [
    {
      id: 1,
      scenario: "You enter a grand, old mansion. What's your first move?",
      imagePrompt:
        "An illustration of a grand, old mansion with intricate architecture and dimly lit interiors. The atmosphere is mysterious and slightly eerie, with shadows playing across the walls.",
      answers: [
        "Explore the rooms", // Openness
        "Check for security", // Conscientiousness
        "Call out to see if anyone is home", // Extraversion
        "Stay close to the exit", // Neuroticism
      ],
    },
    {
      id: 2,
      scenario: "You find a locked diary in a dusty drawer. What do you do?",
      imagePrompt:
        "A detailed illustration showing a close-up of a locked diary with an ornate lock. The lighting is soft, highlighting the dust and age of the diary.",
      answers: [
        "Try to unlock it", // Openness
        "Leave it untouched", // Conscientiousness
        "Ask someone for help", // Agreeableness
        "Worry about privacy", // Neuroticism
      ],
    },
    {
      id: 3,
      scenario: "You hear a strange noise upstairs. What's your reaction?",
      imagePrompt:
        "An illustration depicting a dark, winding staircase leading upstairs. The lighting is dim, casting long shadows and creating a sense of suspense.",
      answers: [
        "Investigate the noise", // Openness
        "Stay downstairs", // Neuroticism
        "Call out to see if anyone answers", // Extraversion
        "Prepare to defend yourself", // Conscientiousness
      ],
    },
    {
      id: 4,
      scenario: "You discover a hidden room. What's your first action?",
      imagePrompt:
        "An illustration with a focus on a hidden room, its contents mysterious and intriguing. The lighting is focused, revealing old artifacts and books.",
      answers: [
        "Explore the room", // Openness
        "Secure the area", // Conscientiousness
        "Invite others to see", // Extraversion
        "Worry about hidden dangers", // Neuroticism
      ],
    },
    {
      id: 5,
      scenario:
        "You meet a mysterious figure who offers you a key. What do you choose?",
      imagePrompt:
        "An illustration showing a mysterious figure in a dimly lit room, with soft, natural lighting that highlights the key they offer.",
      answers: [
        "Accept the key", // Openness
        "Ask what it opens", // Conscientiousness
        "Share the discovery", // Extraversion
        "Refuse the key, fearing a trap", // Neuroticism
      ],
    },
  ],
  apocalypse: [
    {
      id: 1,
      scenario: "You find yourself in a deserted city. What's your first move?",
      imagePrompt:
        "An illustration of a deserted city, with crumbling buildings and overgrown vegetation. The lighting is harsh, casting stark shadows and highlighting the desolation.",
      answers: [
        "Search for supplies", // Conscientiousness
        "Explore the city", // Openness
        "Call out for other survivors", // Extraversion
        "Find a safe place to hide", // Neuroticism
      ],
    },
    {
      id: 2,
      scenario: "You encounter a group of survivors. How do you react?",
      imagePrompt:
        "A detailed illustration showing a group of survivors, their expressions wary and hopeful. The lighting is natural, highlighting their makeshift camp and the surrounding ruins.",
      answers: [
        "Approach them", // Extraversion
        "Observe from a distance", // Neuroticism
        "Prepare to defend yourself", // Conscientiousness
        "Try to communicate", // Agreeableness
      ],
    },
    {
      id: 3,
      scenario:
        "You find a map leading to a rumored safe zone. What do you do?",
      imagePrompt:
        "An illustration depicting a tattered map, with a highlighted route to a safe zone. The lighting is focused, creating a sense of hope and urgency.",
      answers: [
        "Plan your journey", // Conscientiousness
        "Share the map with others", // Extraversion
        "Doubt the map's authenticity", // Neuroticism
        "Study the map thoroughly", // Openness
      ],
    },
    {
      id: 4,
      scenario:
        "You discover a stockpile of weapons. What is your first action?",
      imagePrompt:
        "An illustration with a focus on a stockpile of weapons, their metal surfaces glinting under a harsh light. The atmosphere is tense, with a sense of potential danger.",
      answers: [
        "Secure the weapons", // Conscientiousness
        "Warn others about the weapons", // Agreeableness
        "Take a weapon for protection", // Neuroticism
        "Discuss the implications with others", // Extraversion
      ],
    },
    {
      id: 5,
      scenario:
        "You meet a survivor who offers to trade valuable information. What do you choose?",
      imagePrompt:
        "An illustration showing a survivor in a tense, guarded stance, with soft, natural lighting that highlights the seriousness of their offer.",
      answers: [
        "Trade something for the information", // Conscientiousness
        "Ask what the information is about", // Openness
        "Share your own information", // Agreeableness
        "Refuse, fearing deception", // Neuroticism
      ],
    },
  ],
};
