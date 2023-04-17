import { Button, Card, CardActions, CardContent, Grid, Typography, CardMedia } from '@mui/material'
import { userCardProps } from './usersCard.types'

const CharacterSelect = (props: userCardProps): JSX.Element => {
  const { onDelete, onUpdate, userData } = props
  const cards = userData.map((c, index) => {
    return (
      <Grid key={`${index}-${c.name}`} item xs={12} sm={6} md={4}>
        <Card sx={{ width: '100%' }}>
          <CardMedia component="img" image={c.avatar} alt={c.first_name} height="400" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {`${c.first_name} ${c.last_name}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`${c.email}`}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={(): void => onUpdate?.(c?.id)} size="small">
              Update
            </Button>
            <Button onClick={(): void => onDelete?.(c?.id)} size="small">
              Delete
            </Button>
          </CardActions>
        </Card>
      </Grid>
    )
  })

  return (
    <div>
      <Grid container spacing={2}>
        {cards}
      </Grid>
    </div>
  )
}

export default CharacterSelect
