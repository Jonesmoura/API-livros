import mongoose from "mongoose";

const EditoraSchema = mongoose.Schema(

    {
        id:{type:String},
        nome:{type:String}
    },
    {

        versionKey:false

    }

)

const editoras = mongoose.model("editoras", EditoraSchema)

export default editoras;