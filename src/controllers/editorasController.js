import editoras from "../models/Editora.js";

class EditoraController {

    static listarEditoras = (req,res)=> {


        editoras.find((err, editoras)=>{

            res.status(200).json(editoras)
    
        })

    }

    static listarEditoraID = (req,res)=>{

        const id = req.params.id

        editoras.findById(id, (err, editoras)=>{

            if(err){

                res.status(400).send({message: `${err.message} - ID da editora não localizada`});

            }else{

                res.status(200).send(editoras);

            }

        })


    }

    static cadastrarEditora = (req,res) => {

        let editora = new editoras(req.body);

        editora.save((err)=>{

            if(err){

                res.status(500).send({message: `${err.message} - falha ao cadastrar editora.`})

            }else{

                res.status(201).send(editora.toJSON());

            }

        })

    }

    static atualizarEditoras = (req, res)=>{

        const id = req.params.id;

        editoras.findByIdAndUpdate(id, {$set:req.body}, (err)=>{

            if(!err){

                res.status(200).send({message: 'Editora atualizado com sucesso'});

            }else{

                res.status(500).send({message: err.message});

            }


        })


    }

    static excluirEditora = (req,res)=>{

        const id = req.params.id;

        editoras.findByIdAndDelete(id, (err)=>{

            if(!err){

                res.status(200).send({message: 'Editora removido com sucesso'});

            }else{

                res.status(500).send({message:err.message});

            }

        })

    }
    
}

export default EditoraController;