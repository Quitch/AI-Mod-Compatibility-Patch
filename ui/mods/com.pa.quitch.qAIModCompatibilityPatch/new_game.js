var qAIModCompatibilityPatchLoaded;

function qAIModCompatibilityPatch() {
    if (qAIModCompatibilityPatchLoaded) {
        return;
    }

    qAIModCompatibilityPatchLoaded = true;

    model.qAIModCompatibilityPatchServerModIsLoaded = ko.observable(false);

    model.qAIModCompatibilityPatchIsHost = ko.computed(function() {
        return model.isGameCreator() && model.qAIModCompatibilityPatchServerModIsLoaded();
    });

    model.qAIModCompatibilityPatchServerModCheckLoaded = function() {
        api.mods.getMountedMods('server', function(mods) {

            // check to see if server mod (and optionally a dev version) are loaded

            var loaded = _.intersection(_.pluck(mods, 'identifier'), ['com.pa.quitch.qAIModCompatibilityPatch', 'com.pa.quitch.qAIModCompatibilityPatch-dev']).length > 0;

            model.qAIModCompatibilityPatchServerModIsLoaded(loaded);
        });
    }

    // once mod data is sent check if server mod is actually loaded

    if (window.scene_server_mod_list && window.scene_server_mod_list.new_game) {
        model.qAIModCompatibilityPatchServerModCheckLoaded();
    }
    else {
        var server_mod_info_updated_handler = handlers.server_mod_info_updated;

        handlers.server_mod_info_updated = function(payload) {
            server_mod_info_updated_handler(payload);

            model.qAIModCompatibilityPatchServerModCheckLoaded();
        }
    }

    model.qAIModCompatibilityPatchServerModIsLoaded.subscribe(function(qAIModCompatibilityPatchServerModIsLoaded) {
        if (qAIModCompatibilityPatchServerModIsLoaded) {
            loadScript("coui://ui/mods/com.pa.quitch.qAIModCompatibilityPatch/ai.js");
        }
    });

    model.qAIModCompatibilityPatchServerModIsHost.subscribe(function(qAIModCompatibilityPatchServerModIsHost) {
        if (qAIModCompatibilityPatchServerModIsHost) {
            loadScript("coui://ui/mods/com.pa.quitch.qAIModCompatibilityPatch/ai.js");
        }
    });
}

try {
    qAIModCompatibilityPatch();
}
catch (e) {
    console.error(e);
}