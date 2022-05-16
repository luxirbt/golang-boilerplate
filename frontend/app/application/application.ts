import Application from '../../domain/models/application/application';
import ApplicationRepository from '../../domain/ports/application/application';

export async function getAll(applicationRepository: ApplicationRepository): Promise<Application[]> {
    return await applicationRepository.getAll();
}

export async function get(applicationRepository: ApplicationRepository, id: number): Promise<Application> {
    return await applicationRepository.get(id);
}

export async function addApplication(
    applicationRepository: ApplicationRepository,
    appname: string,
    url: string,
    displayname: string,
    webapp: boolean
): Promise<Application> {
    return await applicationRepository.save(appname, url, displayname, webapp);
}

export async function updateApplication(
    userRepository: ApplicationRepository,
    id: number,
    appname: string,
    url: string,
): Promise<Application> {
    return await userRepository.updateApplication(id, appname, url);
}

export async function addSvg(
    svgRepository: ApplicationRepository,
    svg_light: string,
    svg_dark: string,
    id_application: number,
): Promise<Application> {
    return await svgRepository.saveSvg(svg_light, svg_dark, id_application);
}
