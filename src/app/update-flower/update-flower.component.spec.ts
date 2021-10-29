import { createServiceFactory, SpectatorService, SpectatorRouting, createRoutingFactory, Spectator, SpectatorHttpOptions, SpectatorHttp, createHttpFactory, HttpMethod } from '@ngneat/spectator';
import { FlowerService } from '../flower.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FlowerComponent } from '../flower/flower.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { AddFlowerComponent } from '../add-flower/add-flower.component';
import { SpyLocation } from '@angular/common/testing'

describe('update-flower-service testing', () => {

    // ARRANGE
    let res: any;
    let spectator: SpectatorService<FlowerService>
    const createService = createServiceFactory({
        service: FlowerService,
        imports: [
            HttpClientTestingModule
        ],
        providers: [
            FlowerService
        ],
    });

    // ACT
    beforeEach(() => {
        spectator = createService();
        spyOn(spectator.service, 'updateFlower').and.returnValue({
            successCode: 200,
            successMessage: 'update success'
        });
        res = spectator.service.updateFlower(1, { name: "aa", origin: "aaaaa" }); //Observable<Object>
    })

    // ASSERT
    it('is service.updateFlower valid', () => {
        expect(spectator.service.updateFlower)
            .withContext('updateFlower not available')
            .not.toBeNull();

        expect(res)
            .withContext('return value != expectation')
            .toEqual({
                successCode: 200,
                successMessage: 'update success'
            });

        expect(spectator.service.updateFlower)
            .withContext('update flower is called once')
            .toHaveBeenCalledTimes(1);
    });

});

describe('flower-HTTP testing', () => {
    // ARRANGE
    let addRes: any;
    let updRes: any;
    let delRes: any;

    let spectator: SpectatorHttp<FlowerService>;
    const createHttp = createHttpFactory({
        service: FlowerService,
        imports: [
            HttpClientTestingModule
        ],
        providers: [
            FlowerService
        ],
    })

    // ACT
    beforeEach(() => {
        spectator = createHttp();
        spyOn(spectator.service, 'addFlower').and.returnValue({
            successCode: 200,
            successMessage: 'add success'
        });

        spyOn(spectator.service, 'updateFlower').and.returnValue({
            successCode: 200,
            successMessage: 'update success'
        });

        spyOn(spectator.service, 'deleteFlower').and.returnValue({
            successCode: 200,
            successMessage: 'delete success'
        });

        addRes = spectator.service.addFlower({ name: "abc", origin: "abc" });
        updRes = spectator.service.updateFlower(1, { name: "abc", origin: "abc" });
        delRes = spectator.service.deleteFlower({ name: "abc", origin: "abc" });
    });

    // ASSERT
    it('value should be', () => {

        expect(addRes)
            .withContext("check addFlower result")
            .toEqual({
                successCode: 200,
                successMessage: 'add success'
            });

        expect(updRes)
            .withContext("check updateFlower result")
            .toEqual({
                successCode: 200,
                successMessage: 'update success'
            });

        expect(delRes)
            .withContext("check deleteFlower result")
            .toEqual({
                successCode: 200,
                successMessage: 'delete success'
            });

    });

});

describe('flower-routing testing', () => {
    // ARRANGE
    let spectator: SpectatorRouting<FlowerComponent>
    const createComponent = createRoutingFactory({
        component: FlowerComponent,
        stubsEnabled: false,
        imports: [
            RouterTestingModule,
            HttpClientTestingModule,

        ],
        providers: [
            { provide: Location, useClass: SpyLocation }
        ],
        routes: [
            {
                path: '',
                component: FlowerComponent
            },
            {
                path: 'flower/add',
                component: AddFlowerComponent
            }
        ]
    });

    // ACT
    beforeEach(async () => {
        spectator = createComponent();

        await spectator.fixture.whenStable();
    });

    // ASSERT
    it('is valid', () => {
        expect(spectator.inject(Location).pathname)
            .withContext('path == /flower/add')
            .toBe('/flower/add');
    });
})