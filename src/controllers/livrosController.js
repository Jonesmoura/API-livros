import livros from "../models/Livro.js";

class LivroController {

    static listarLivros = (req,res)=> {

        //utilizando método da biblioteca do mongoose

        livros.find()
            .populate('autor')
            .exec
        ((err, livros)=>{

            res.status(200).json(livros)
    
        })

    }

    static listarLivroID = (req,res)=>{

        const id = req.params.id

        //utilizando método da biblioteca do mongoose

        livros.findById(id)
        .populate('autor', 'nome').populate('editora', 'nome')
        .exec((err, livros)=>{

            if(err){

                res.status(400).send({message: `${err.message} - ID do livro não localizada`});

            }else{

                res.status(200).send(livros);

            }

        })


    }

    static cadastrarLivro = (req,res) => {

        let livro = new livros(req.body);

        livro.save((err)=>{

            if(err){

                res.status(500).send({message: `${err.message} - falha ao cadastrar livro.`})

            }else{

                res.status(201).send(livro.toJSON());

            }


        })


    }

    static atualizarLivros = (req, res)=>{

        const id = req.params.id;

        //utilizando método da biblioteca do mongoose

        livros.findByIdAndUpdate(id, {$set:req.body}, (err)=>{

            if(!err){

                res.status(200).send({message: 'Livro atualizado com sucesso'});

            }else{

                res.status(500).send({message: err.message});

            }

        })

    }

    static excluirLivro = (req,res)=>{

        const id = req.params.id;

        //utilizando método da biblioteca do mongoose

        livros.findByIdAndDelete(id, (err)=>{

            if(!err){

                res.status(200).send({message: 'Livro removido com sucesso'});

            }else{

                res.status(500).send({message:err.message});

            }

        })


    }

    static listarLivroPorEditora = (req,res)=>{

        const editora = req.query.editora
        livros.find({"editora":editora}, {}, (err, livros)=>{

            if(err){

                res.status(404).send({message: `${err.message} - ID da editora não localizado`});

            }else{

                res.status(200).send(livros);

            }

        })

    }
    
}

export default LivroController;