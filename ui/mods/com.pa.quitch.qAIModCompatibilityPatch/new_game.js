var qAIModCompatibilityPatchLoaded;

function qAIModCompatibilityPatch() {
    if (qAIModCompatibilityPatchLoaded) {
        return;
    }

    qAIModCompatibilityPatchLoaded = true;

    api.debug.log('AI Mod Compatability Patch is adding personality tag "vanilla" to all default AI personalities');

    var aiPersonalities = model.aiPersonalities();

    var defaultAiPersonalities = ['Idle', 'Normal', 'Hard', 'Relentless', 'Absurd'];

    _.forEach(aiPersonalities, function (personality, name) {
        if (defaultAiPersonalities.indexOf(name) != -1) {
            personality.personality_tags = _.union(personality.personality_tags || [], ['Vanilla']);
        }
    });

    model.aiPersonalities.valueHasMutated();

}

try {
    qAIModCompatibilityPatch();
}
catch (e) {
    console.error(e);
}