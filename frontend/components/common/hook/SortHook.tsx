/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, useState } from 'react';

export default function useSort(needle: any[], setEventsToShow: Dispatch<SetStateAction<any[]>>) {
    const [sort, setSort] = useState<any>({});

    const handleSort = (e: React.MouseEvent) => {
        const id = (e.target as HTMLInputElement).id;

        setSort((prevState: any) => ({
            ...prevState,
            [id]: !sort[id],
        }));

        const sortedEvents = [...needle].sort((a, b) => {
            return sort[id]
                ? (a[id] as string).localeCompare(b[id] as string)
                : (b[id] as string).localeCompare(a[id] as string);
        });

        setEventsToShow(sortedEvents);
    };

    return { handleSort };
}
