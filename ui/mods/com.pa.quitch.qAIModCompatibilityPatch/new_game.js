var qAIModCompatibilityPatchLoaded;

function qAIModCompatibilityPatch() {
  if (qAIModCompatibilityPatchLoaded) {
    return;
  }

  qAIModCompatibilityPatchLoaded = true;

  api.debug.log(
    'AI Mod Compatability Framework is adding personality tag "vanilla" to all default AI personalities'
  );

  var aiPersonalities = model.aiPersonalities();

  var defaultAiPersonalities = ["Normal", "Hard", "Relentless", "Absurd"];

  _.forEach(aiPersonalities, function (personality, name) {
    if (_.includes(defaultAiPersonalities, name)) {
      personality.personality_tags = _.union(
        personality.personality_tags || [],
        ["Vanilla"]
      );
    }
  });

  model.aiPersonalities.valueHasMutated();
}

try {
  qAIModCompatibilityPatch();
} catch (e) {
  console.error(e);
}
