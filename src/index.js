const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv').config()
const PORT = process.env.PORT || 5000

require('./db/mongoose')
require('./services/cache')

const ui = require('./routes/ui')
const adminRouter = require('./routes/admin')
const adminCTARouter = require('./routes/admin/activities/cta')
const adminTestimonialsRouter = require('./routes/admin/activities/testimonials')
const adminCategoriesRouter = require('./routes/admin/activities/categories')
const adminImagesRouter = require('./routes/admin/activities/images')
const adminTeamRouter = require('./routes/admin/activities/team')
const {router: adminUploadsRouter} = require('./routes/admin/activities/uploads')
const adminBlogRouter = require('./routes/admin/activities/blogs')
const adminCareersRouter = require('./routes/admin/activities/careers')

const Admin = require('./models/admin')

const { sendContactMail } = require('./emails/contact')

app.use(cors())
app.use(express.json())

app.use('/ui', ui)
app.use('/admin', adminRouter)
app.use('/admin/activities/cta', adminCTARouter)
app.use('/admin/activities/testimonials', adminTestimonialsRouter)
app.use('/admin/activities/categories', adminCategoriesRouter)
app.use('/admin/activities/images', adminImagesRouter)
app.use('/admin/activities/team', adminTeamRouter)
app.use('/admin/activities/uploads', adminUploadsRouter)
app.use('/admin/activities/blogs', adminBlogRouter)
app.use('/admin/activities/careers', adminCareersRouter)

app.post('/admin/sendContactMail', async (req, res) => {
  try {
    const admin = await Admin.find({}, 'email name')
        
    sendContactMail(admin[0].email, admin[0].name, req.body)
    
    res.send({ message: 'Sent!!!' })
  } catch (e) {
    console.log(e.message)
    res.status(500).send(e.message)
  }
})

if (['production'].includes(process.env.NODE_ENV)) {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https' && process.env.HTTPS_REDIRECT === 'true')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else
      next()
  })

  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}

app.listen(PORT)