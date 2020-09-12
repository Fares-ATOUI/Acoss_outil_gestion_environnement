var db = require('../model/acossDB');

var exports = module.exports = {}


exports.list_form = function (req, res) {
    res.send(db.getListForm());
};


exports.list_responsable = function (req, res) {
    res.send(db.getListResponsable());
};

exports.list_timeline = function (req, res) {

    db.getTimeline(function(lstes){
        res.send(lstes)
    })
};

exports.list_timeline2 = function (req, res) {
    
    db.getTimeline2(function (lostes) {
        res.send(lostes)
    })
};

exports.list_historique = function (req, res) {

    db.getListHistorique(function(listes){
        res.send(listes);
    })
};

exports.list_historique_details = function (req, res) {

    db.getListHistoriqueDetails(req.params.id, function(list){
        res.send(list)
    })
};

exports.delete_list_historique_details = function (req, res) {
    res.send(db.deleteListHistoriqueDetails(req.params.id));
};

exports.list_projet_mm_date_mep = function (req, res) {

    db.getListProjetMmMep(function (listesProjetMm) {
        res.send(listesProjetMm);
    })
};

exports.list_timeline3 = function (req, res) {
   
    db.getTimeline3(req.params.name, function (liust) {
        res.send(liust)
    })
};

exports.list_options = function (req, res) {

    db.getOptions(function (options) {
        res.send(options)
    })
};

exports.list_projets_incubation = function (req, res) {

    db.getListProjetsIncubation( function (listeProjets) {
        res.send(listeProjets)
    })
};

exports.list_projets_incubation_details = function (req, res) {

    db.getListProjetsIncubationDetails(req.params.id, function (listeDetails) {
        res.send(listeDetails)
    })
};

exports.list_projets_incubation_prevision = function (req, res) {

    db.getListProjetsIncubationPrevision(function (listePrevision) {
        res.send(listePrevision)
    })
};

exports.list_requete = function (req, res) {

    db.getRequete(req.params.bio, function (listeReq) {
        res.send(listeReq)
    })
};

exports.list_admin_requete = function (req, res) {

    db.getAdminRequete(function (listes) {
        res.send(listes);
    })
};

exports.delete_list_admin_requete = function (req, res) {
   
    res.send(db.deleteListAdminRequete(req.params.id));
};

exports.list_admin_details = function (req, res) {

    db.getListAdminDetails(req.params.id, function (list) {
        res.send(list)
    })
};

exports.list_crud = function (req, res) {
    db.getCrud(req.params.opt, function (list) {
        res.send(list)
    })
};
 
exports.getLogiciels = function (req, res) {
    db.getListLogiciels(function (lostes) {
        res.send(lostes)
    })
};  
exports.getAcces = function (req, res) {
    db.getListAcces(function (listes) {
        res.send(listes)
    })
}; 

exports.getFonction = function (req, res) {
    db.getListFonction(function (listes) {
        res.send(listes)
    })
};  

exports.getBdd = function (req, res) {
    db.getListBdd(function (listes) {
        res.send(listes)
    })
};  

exports.getV2 = function (req, res) {
    db.getListV2(function (listes) {
        res.send(listes)
    })
}; 





