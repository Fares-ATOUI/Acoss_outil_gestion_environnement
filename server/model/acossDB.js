
const { Client } = require('pg')
let moment = require('moment');


require('dotenv').config()

const client = new Client({
    user: "postgres",
    password: "khalildihya",
    host: "localhost",
    port: 5432,
    database: "form-db"

})


var exports = module.exports = {}

var gb = require('../service/groupeBy');
var dt = require('../service/dateFormat');


let RestList = []
let RestResponsable = []
let RestTimeline = []
let RestTimeline2 = []


// Query
client.connect()

exports.insertForm = function (data) {

    let nom_projet = data[0].info.nom_Projet
    let libelle = data[0].info.libel
    let cp_technique = data[0].info.chef_projet_tech
    let cp_fonct = data[0].info.chef_projet_fonctionnel
    let email = data[0].info.email
    let jh_conception = data[0].info.jour_homme_conception
    let jh_integration = data[0].info.jour_homme_integration
    let jh_developpement = data[0].info.jour_homme_developpement
    let jh_recette = data[0].info.jour_homme_recette
    let jh_total = data[0].info.jour_homme_total

    let date_entree_incubation = data[0].dates.date_incubation ? data[0].dates.date_incubation : null
    let date_entree_integration = data[0].dates.date_integration ? data[0].dates.date_integration : null
    let date_mep = data[0].dates.date_mep ? data[0].dates.date_mep : null
    let echance = data[0].dates.echeances ? data[0].dates.echeances : null

    let besoin_bascule = data[0].bascule_validation.besoin_bascule
    let besoin_validation = data[0].bascule_validation.besoin_validation

    let pora = data[0].portail.pora
    let harmony_rcp = data[0].portail.harmony_rcp
    let harmony_web = data[0].portail.harmony_web
    let urssaf_fr = data[0].portail.urssaf_fr

    let accrochage_avec_partenaire = data[0].autres.accrochage_avec_partenaire
    let nouvelle_application_anais = data[0].autres.nouvelle_application_anais
    let nom_application_anais = data[0].autres.application_anais
    let nouvelle_gris_de_droit = data[0].autres.nouvelle_gris_de_droit
    let application_gris_droit = data[0].autres.application_gris_droit
    let flux_entrant_sortant = data[0].autres.flux_entrant_sortant
    let commentaire_flux = data[0].autres.commentaire_flux

    let nom_moa = data[0].test.nom_moa
    let nom_moe = data[0].test.nom_moe
    let nom_mue = data[0].test.nom_mue
    let support_sdit = data[0].test.support_sdit
    let demo_presentation = data[0].test.demo_presentation
    let date_demo = data[0].test.date_demo ? data[0].test.date_demo : null

    let besoin_vm = data[0].vm.vm
    let combien_vm = data[0].vm.nombre_vm
    let logiciel_vm = data[0].vm.logicel_vm

    let v2 = data[0].v2.v2
    let code_organisation = data[0].v2.code_organisation
    let justificaiton = data[0].v2.justificaiton
    let conteneur_v2 = data[0].v2.contenuer_v2
    let batch_v2 = data[0].v2.batch_v2
    let transaction = data[0].v2.transaction
    let web_service = data[0].v2.web_service
    let installation_de_lot_frequente = data[0].v2.installation_de_lot_frequente
    let lancement_sessions_batch_frequentes = data[0].v2.lancement_sessions_batch_frequentes
    let restauration_de_donnee_frequente = data[0].v2.restauration_de_donnee_frequente
    let editique = data[0].v2.editique


    let v2_details = data[0].v2.v2_details

    let acces = data[0].acces.acces

    let dataTech = data[0].dependance_adherence.technique


    let idresp = 1



    let heureInsertion = moment().format('kk:mm')
    let dateInsertion = moment().format('L')



    console.log("here : ", heureInsertion)
    console.log("date ", dt.date_format(dateInsertion))


    const text3 = 'INSERT INTO projet(code_projet, date_insertion, heure_insertion) VALUES($1, $2, $3) RETURNING *'
    const values3 = [nom_projet, dateInsertion, heureInsertion]



    client
        .query(text3, values3)
        .then(resultat => {

            let idprojet = resultat.rows[0].id_projet
            console.log("acoss fb : id_projet: ", resultat.rows)

            client
                .query(`select * from application`)
                .then(res => {
                    let resu = res.rows

                    resu.forEach(element => {
                        dataTech.forEach(el => {
                            let nom_app = el.name
                            let domaine = el.domaine
                            let adherence = el.checkbox
                            let commentaire_app = el.commentaire_app
                            let dateDebApp = el.dateDeb
                            let dateFinApp = el.date
                            let type_app = element.type_app
                            let id_resp = element.id_responsable
                            let description = element.description
                            let id_app_param = element.id_app

                            if (nom_app == element.nom_app) {
                                console.log("ok insertion application acoss db : ")
                                const text4 = "INSERT INTO application_form(nom_app, domaine, type_app, id_responsable, description, id_app_param, id_projet, adherence, commentaire_app, date_fin, date_deb) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *"
                                const values4 = [nom_app, domaine, type_app, id_resp, description, id_app_param, idprojet, adherence, commentaire_app, dateFinApp, dateDebApp]

                                client
                                    .query(text4, values4)
                                    .then(resultat => {
                                        console.log("application acoss : ", resultat.rows[0])
                                        let app = resultat.rows[0].id_app_param

                                        const text = 'INSERT INTO projet_lot( code_projet, libelle, cp_technique, email, jh_concept, jh_integration, jh_dev, jh_recette, jh_total, date_livraison, date_integration, id_responsable,  id_projet, date_mep, id_app, echeance, cp_fonctionnel, besoin_bascule, besoin_validation ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING *'
                                        const values = [nom_projet, libelle, cp_technique, email, jh_conception, jh_integration, jh_developpement, jh_recette, jh_total, date_entree_incubation, date_entree_integration, idresp, idprojet, date_mep, app, echance, cp_fonct, besoin_bascule, besoin_validation]

                                        client
                                            .query(text, values)
                                            .then(res => {
                                                console.log("acoss db insertion  projet lot : ", res.rows[0])


                                            });

                                    })

                            }
                        })
                    })
                });


            const text5 = 'INSERT INTO donnes_techniques(besoin_vm, combien_vm, logiciel, acces, test_nom_moa, test_nom_moe, test_nom_mue, test_responsable_sdit, besoin_demo_presentation, date_demo, portail_pora, portail_harmony_web, portail_harmony_rcp, portail_urssaf, accrochage_partenaire, nouvelle_application_anais, nom_applicaiton_anais, nouvelle_gris_droit, nom_application_gris, jeux_de_donnes, commentaire, v2, conteneur_v2, transaction, batch_v2, web_service, code_organisation, justification_code_org, id_projet,instal_lot_freq, lancement_session_batch_freq, restauration_donnee_freq, editique) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33) RETURNING *'
            const values5 = [besoin_vm, combien_vm, logiciel_vm, acces, nom_moa, nom_moe, nom_mue, support_sdit, demo_presentation, date_demo, pora, harmony_web, harmony_rcp, urssaf_fr, accrochage_avec_partenaire, nouvelle_application_anais, nom_application_anais, nouvelle_gris_de_droit, application_gris_droit, flux_entrant_sortant, commentaire_flux, v2, conteneur_v2, transaction, batch_v2, web_service, code_organisation, justificaiton, idprojet, installation_de_lot_frequente, lancement_sessions_batch_frequentes, restauration_de_donnee_frequente, editique]

            client
                .query(text5, values5)
                .then(res => {
                    console.log("données tech : ", res.rows[0])

                })
                console.log("acoss fb v2 details : ", v2_details)

            v2_details.forEach(el => {
                console.log("el", el)
                let code_org = el.code_org
                let add_server = el.add_serveur
                let couloir_v2 = el.couloir
                let justification_v2 = el.justification
                let connectee_archimed = el.archimed
                let connectee_esb = el.esb
                let dates_v2 = el.dates
                
                if(el.dates){
                    let dates = el.dates
                dates.forEach(elements => {
                    let date_deb_v2 = elements.dateDebOrg
                    let date_fin_v2 = elements.dateFinOrg

                    const text6 = 'INSERT INTO v2_details(web_service, code_org, add_server, couloir, justification,  connectee_archimed, connectee_esb, date_deb_v2, date_fin_v2, id_projet, dates) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *'
                    const values6 = [web_service, code_org, add_server, couloir_v2, justification_v2, connectee_archimed, connectee_esb, date_deb_v2, date_fin_v2, idprojet,  dates_v2]


                    client
                        .query(text6, values6)
                        .then(resultats => {
                            console.log("dv2 details : ", resultats.rows[0])

                        })
                })
            }else{
                    const text6 = 'INSERT INTO v2_details(web_service, code_org, add_server, couloir, justification,  connectee_archimed, connectee_esb, id_projet) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *'
                    const values6 = [web_service, code_org, add_server, couloir_v2, justification_v2, connectee_archimed, connectee_esb, idprojet]


                    client
                        .query(text6, values6)
                        .then(resultats => {
                            console.log("dv2 details : ", resultats.rows[0])

                        })
            }
            })

        })


};

exports.getListHistorique = function (callback) {

    client.query(`select * from projet`)
        .then(results => {
            callback(results.rows)
        })
};

exports.getListHistoriqueDetails = function (id, callback2) {

    client.query("select distinct p.id_projet, p.date_mep, p.code_projet, p.libelle, p.cp_technique, p.email, p.jh_concept,p.jh_integration, p.jh_dev, p.jh_recette, p.jh_total, p.date_livraison, p.date_integration,p.echeance, p.cp_fonctionnel, p.besoin_bascule, p.besoin_validation, a.nom_app, a.domaine, a.id_app_param, a.date_deb, a.date_fin, a.commentaire_app, a.adherence, d.besoin_vm, d.combien_vm, d.logiciel, d.acces, d.test_nom_moa, d.test_nom_moe,d.test_nom_mue, d.test_responsable_sdit, d.besoin_demo_presentation, d.date_demo, d.portail_pora,d.portail_harmony_web, d.portail_harmony_rcp, d.portail_urssaf, d.accrochage_partenaire, d.nouvelle_application_anais, d.nom_applicaiton_anais, d.nouvelle_gris_droit, d.nom_application_gris, d.jeux_de_donnes, d.commentaire,d.v2, d.conteneur_v2, d.transaction, d.batch_v2, d.web_service, d.code_organisation, d.justification_code_org, d.web_service, d.instal_lot_freq, d.lancement_session_batch_freq, d.restauration_donnee_freq, d.editique,v.code_org, v.add_server, v.couloir, v.justification, v.connectee_archimed, v.connectee_esb, v.date_deb_v2, v.date_fin_v2 from projet_lot p left join application_form a on (p.id_projet = a.id_projet) left join donnes_techniques d on (p.id_projet= d.id_projet) left join v2_details v on (p.id_projet = v.id_projet) where p.id_projet = '" + id + "'")
        .then(results => {
            console.log("details historique : ", results.rows)
            callback2(results.rows)
        })


};

exports.deleteListHistoriqueDetails = function (id) {

    client.query("delete from projet_lot pl  where pl.id_projet = '" + id + "'")
    .then(() => {
            "delete from donnes_techniques d where d.id_projet = '" + id + "'"
        }).then(() => {
            client.query("delete from v2_details v  where v.id_projet = '" + id + "'")
            console.log("suppression  v2_details ")
        }).then(() => {
            client.query("delete from projet p  where p.id_projet = '" + id + "'")
        }).then(() => {
            "delete from application_form a where a.id_projet = '" + id + "'"
        })
    console.log("deleted: ")
    return JSON.stringify("200")
};

exports.getTimeline = function (callback3) {

    client.query(` select DISTINCT P2.code_projet, P2.date_livraison, P2.date_integration 
     from projet_lot P2 
    `)
        .then(test => {

            let data = test.rows;

            RestTimeline = []
            data.forEach(el => {
                let date_db_incub_ = dt.date_format(el.date_livraison)
                let date_fn_incub_ = dt.date_format(el.date_integration)

                RestTimeline.push({
                    x: el.code_projet,
                    y: [
                        new Date(date_db_incub_).getTime(),
                        new Date(date_fn_incub_).getTime()
                    ]
                })

            })
            callback3(RestTimeline)

        })
};

exports.getTimeline2 = function (callback4) {
    client.query(`
 select DISTINCT P2.id_projet ,P2.id_app, a.nom_app, P2.code_projet, P2.date_livraison, P2.date_integration  
 from projet_lot P2 left join application_form a on (p2.id_projet = a.id_projet )

 `)
        .then(timeline => {
            let data = timeline.rows;
            var nameHashMap = gb.groupBy(data, el => el.code_projet);

            RestTimeline2 = [];
            new Map(nameHashMap).forEach((el, key, hashMap) => {
                let data = [];

                hashMap.get(key).forEach((element) => {

                    let date_db_incub_ = dt.date_format(element.date_livraison)
                    let date_fn_incub_ = dt.date_format(element.date_integration)

                    data.push({
                        x: element.nom_app,
                        y: [
                            new Date(date_db_incub_).getTime(),
                            new Date(date_fn_incub_).getTime()
                        ]
                    })
                });

                RestTimeline2.push({
                    name: hashMap.get(key)[0].code_projet,
                    data: data
                });
            })
            callback4(RestTimeline2)
        })
};

exports.updateForm = function (data, id) {
    console.log('M.A.J ', data[0].v2_details)

    client.query("delete from projet_lot pl  where pl.id_projet = '" + id + "'")
        .then(() => {
            client.query("delete from application_form a   where a.id_projet = '" + id + "'")
        }).then(() => {
            client.query("delete from donnes_techniques d  where d.id_projet = '" + id + "'")
            console.log("suppression   ")
        }).then(() => {
            client.query("delete from v2_details v  where v.id_projet = '" + id + "'")
            console.log("suppression   ")
        }).then(() => {
            client.query("delete from projet p  where p.id_projet = '" + id + "'")
        }).then(() => {
            this.insertForm(data)
            console.log('insertion de nouveau ')
        })

};

exports.getListProjetMmMep = function (callback5) {

    client.query(`select DISTINCT P2.code_projet, P2.libelle, P2.id_projet from projet_lot P1, projet_lot P2
                              where P1.id_projet != P2.id_projet
                              and P1.date_mep = P2.date_mep  `)
        .then(results => {
            callback5(results.rows)
        })
};

exports.getTimeline3 = function (name, callback6) {

    RestTimeline3 = [];
    if (name) {
        let names = name.split(',')
        //console.log("name db ", names)
        //let debut = "("
        let sep = ",";
        let debut = "("
        for (let i = 0; i < names.length; i++) {
            if (i > 0) {
                debut += sep + "'" + names[i] + "'"
            } else {
                debut += "'" + names[i] + "'"
            }
        }
        debut += ")"
        console.log(debut)

        // name.forEach(element => {
        client.query("select DISTINCT P2.id_projet , a.nom_app, P2.code_projet, a.date_deb, a.date_fin from projet_lot P2 left join application_form a on (p2.id_projet = a.id_projet )  where a.date_deb != a.date_fin and  a.nom_app IN " + debut + " ")
            .then(timeline => {
                //console.log(timeline.rows)
                let data = timeline.rows;
                var nameHashMap = gb.groupBy(data, el => el.code_projet);


                new Map(nameHashMap).forEach((el, key, hashMap) => {
                    let data = [];

                    hashMap.get(key).forEach((element) => {

                        let date_db_incub_ = dt.date_format(element.date_deb)
                        let date_fn_incub_ = dt.date_format(element.date_fin)

                        data.push({
                            x: element.nom_app,
                            y: [
                                new Date(date_db_incub_).getTime(),
                                new Date(date_fn_incub_).getTime()
                            ]
                        })
                    });

                    RestTimeline3.push({
                        name: hashMap.get(key)[0].code_projet,
                        data: data
                    });
                })
                console.log('%o', RestTimeline3)
                callback6(RestTimeline3)

            });
    }
    else (callback6(RestTimeline3))
};

exports.getOptions = function (callback7) {

    client.query("select distinct nom_app, domaine from application_form")
        .then(timeline => {
            let data = timeline.rows;
            var nameHashMap = gb.groupBy(data, el => el.domaine);

            RestTimeline4 = [];
            new Map(nameHashMap).forEach((el, key, hashMap) => {
                let data = [];

                hashMap.get(key).forEach((element) => {

                    let name = element.nom_app
                    let domaine = element.domaine

                    data.push({
                        name: name,
                        domaine: domaine
                    })
                });

                RestTimeline4.push({
                    domaine: hashMap.get(key)[0].domaine,
                    libs: data
                });
            })
            callback7(RestTimeline4)
        })
};

exports.getListProjetsIncubation = function (callback8) {

    client.query("select distinct  p.id_projet ,p.date_mep, p.code_projet, p.libelle,  p.date_livraison, p.date_integration, count(id_app) as nbr_app from projet_lot p group by p.id_projet, p.date_mep, p.code_projet, p.libelle,  p.date_livraison, p.date_integration ")
        .then(results => {
            callback8(results.rows)
        })


};

exports.getListProjetsIncubationDetails = function (id, callback9) {

    client.query("select distinct p.id_projet, p.date_mep, p.code_projet, p.libelle, p.cp_technique, p.email, p.jh_concept,p.jh_integration, p.jh_dev, p.jh_recette, p.jh_total, p.date_livraison, p.date_integration, p.echeance, p.cp_fonctionnel, p.besoin_bascule, p.besoin_validation, a.nom_app, a.domaine, a.id_app_param, a.date_deb, a.date_fin, a.commentaire_app, a.adherence from projet_lot p left join application_form a on (p.id_projet = a.id_projet) where p.id_projet = '" + id + "'")
        .then(results => {
            callback9(results.rows)
        })


};

exports.getListProjetsIncubationPrevision = function (callback10) {

    client.query("select distinct date_diff('day'::character varying, now()::date::timestamp without time zone, p.date_livraison::timestamp without time zone) as diff, code_projet, date_livraison, p.date_integration, p.date_mep from projet_lot p group by code_projet, p.date_livraison, p.date_integration, p.date_mep")
        .then(results => {
            callback10(results.rows)
        })


};

exports.getRequete = function (req, callback11) {
    console.log(req)
    client
        .query(req)
        .then(result => {
            // console.log("result", result.rows)
            if (result.rows.length) {
                callback11(result.rows)
            }
        })
        .catch(e =>
            console.error(e.stack)
        )
};

exports.insertRequete = function (data) {


    let libelle = data[0].libelle
    let req = data[0].req
    console.log("server req : ", data)
    const text = 'INSERT INTO admin_requete(libelle, req) VALUES($1, $2) RETURNING *'
    const values = [libelle, req]


    client
        .query(text, values)
        .then(result => {
            console.log("result", result.rows)
            //callback11(result.rows)
        })
        .catch(e => console.error(e.stack))
};

exports.getAdminRequete = function (callback12) {
    client.query(`select * from admin_requete`)
        .then(results => {
            callback12(results.rows)
        })
        .catch(e => console.error(e.stack))
};

exports.deleteListAdminRequete = function (id) {
    console.log(id, " bd")
    client.query("delete from admin_requete   where id_req = '" + id + "'")

    console.log("deleted: ")
    return JSON.stringify("200")
};

exports.getListAdminDetails = function (id, callback13) {

    client.query("select * from admin_requete where id_req = '" + id + "'")
        .then(results => {
            callback13(results.rows)
        })


};


