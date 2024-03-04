import express from 'express'
import Ads from '../models/Ads.mjs'
const router = express.Router()

//POST: localhost:3001/ads
router.get('/', async (req, res) => {
    const ads = await Ads.find()
    res.send({ message: 'Ads fetched successfully', data: ads })
    console.log('data',ads);
})

// router.get('/:id')

router.post('/post', async (req, res) => {
    try {
        const ad = new Ads(req.body)
        await ad.save() 
console.log(Ads); 
        res.send({ message: 'Ad posted successfully' })
    } catch (e) {
        res.send({ message: e.message })
    }
})

router.get('/:id', async (req, res) => {
    const ads = await Ads.findById(req.params.id)
    res.send({ message: 'Ads fetched successfully', data: ads })
    console.log('req',req.params.id);
    console.log('ads',ads);
})  

//router.put('ads/:id')
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const updatedAd = req.body
        const ad = await Ads.findByIdAndUpdate(id, updatedAd, { new: true })
        if (!ad) {
            return res.status(404).send({ message: 'Ad not found' })
        }
        console.log('Updated ad:', ad);
        res.send({ message: 'Ad updated successfully', data: ad })
    } catch (error) {
        res.status(500).send({ message: 'Error updating ad', error: error.message })
    }
})

//router.delete('/:id')


router.delete('/:id', async(req,res)=>{
    try{
        const deletedAd = await Ads.deleteOne({_id: req.params.id},req.body,
{new:true});
res.send({message:"Products Deleted Successfully ",deletedAd})
    } catch(e){
        res.send({message:e.message})
    }
})

router.put('/:id', async(req,res)=>{
    try{
        const UpdatedProducts= await Ads.findOneAndUpdate({_id : req.params.id},req.body,
            
            {new:true});
res.send({message:"Updated Successfully",updatedAd});

        }catch(e){
            res.send({message:e.message})
        }
})

export default router