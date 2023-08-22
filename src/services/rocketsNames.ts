import { spaceX } from "./spaceX"

export async function replaceRocketIdsWithNames(data: LaunchPad[]) {
    // Fetch rocket data for each rocket ID
    const rocketsData = await Promise.all(
      data.flatMap((item: LaunchPad) => item.rockets).map((rocketId: string) =>
        spaceX(`v4/rockets/${rocketId}`)
      )
    )
  
    // Create a map of rocket IDs to rocket names
    const rocketsMap = Object.fromEntries(
      rocketsData.map((rocket: Rocket) => [rocket.id, rocket.name])
    )
  
    // Replace rocket IDs with rocket names
    const updatedData: LaunchPad[] = data.map((item: LaunchPad) => ({
      ...item,
      rockets: item.rockets.map((rocketId: string) => rocketsMap[rocketId]),
    }))
  
    return updatedData
  }