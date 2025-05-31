import { handleShutdown } from '../../utils/shutdown';
import * as dbModule from '../../infrastructure/db';

describe('Graceful Shutdown Handler', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call closeDbConnections and exit on SIGINT', async () => {
        const closeMock = jest
            .spyOn(dbModule, 'closeDbConnections')
            .mockResolvedValue();
        const exitMock = jest.spyOn(process, 'exit').mockImplementation(() => {
            throw new Error('process.exit called'); // prevent real exit
        });

        await expect(handleShutdown('SIGINT')).rejects.toThrow(
            'process.exit called'
        );

        expect(closeMock).toHaveBeenCalled();
        expect(exitMock).toHaveBeenCalledWith(0);
    });
});
