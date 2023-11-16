import { Grid, Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button } from "@chakra-ui/react";

interface Post {
    image: string;
    alt: string;
    title: string;
    description: string;
    link: string;
}

interface PostCardProps {
    posts: Post[];
}

const PostCard: React.FC<PostCardProps> = ({ posts }) => {
    return (
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
            {posts.map((post, index) => (
                <Card key={index} maxW='sm'>
                    <CardBody>
                        <Image
                            src={post.image}
                            alt={post.alt}
                            borderRadius='lg'
                        />
                        <Stack mt='6' spacing='3'>
                            <Heading size='md'>{post.title}</Heading>
                            <Text>{post.description}</Text>
                        </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <ButtonGroup spacing='2'>
                            <Button variant='solid' colorScheme='blue'>
                                See more
                            </Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
            ))}
        </Grid>
    );
}

export default PostCard;