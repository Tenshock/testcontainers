import {ElasticsearchContainer} from 'testcontainers';
import {Client} from '@elastic/elasticsearch';

describe('elastic-search testcontainers', () => {
    it('should create an instance', async () => {
        // Given
        const container = await new ElasticsearchContainer(
            'docker.elastic.co/elasticsearch/elasticsearch:8.4.3'
        ).start();

        const client = new Client({node: container.getHttpUrl()});

        // When
        const response = await client.indices.create({index: 'people'});

        // Then
        expect(response).toBeTruthy();
        await container.stop();
    });
});
