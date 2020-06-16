
module.exports = function (app) {

    var restApi = require('../controller/restApi');

    // todoList Routes
    app.route('/form')
        .get(restApi.list_form);

    app.route('/responsable')
        .get(restApi.list_responsable);
    
    app.route('/timeline')
        .get(restApi.list_timeline);

    app.route('/timeline2')
        .get(restApi.list_timeline2);

    app.route('/historique')
        .get(restApi.list_historique);

    app.route('/historique/details/:id')
        .get(restApi.list_historique_details); 

    app.route('/historique/details/delete/:id')
        .delete(restApi.delete_list_historique_details);

    app.route('/projet_mm_date_mep')
        .get(restApi.list_projet_mm_date_mep);

    app.route('/timeline3/:name')
        .get(restApi.list_timeline3);

    app.route('/options')
        .get(restApi.list_options);

    app.route('/projet_en_incubation')
        .get(restApi.list_projets_incubation);

    app.route('/tableau/details/:id')
        .get(restApi.list_projets_incubation_details); 

    app.route('/projet_en_incubation_prevision')
        .get(restApi.list_projets_incubation_prevision);
};