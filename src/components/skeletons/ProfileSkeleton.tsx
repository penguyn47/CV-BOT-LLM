import React from 'react'

export default function ProfileSkeleton() {
	return (
		<div className="mx-auto max-w-4xl p-6">
			{/* Skeleton for Action Buttons */}
			<div className="mb-6 flex justify-end space-x-4">
				<div className="h-10 w-10 animate-pulse rounded-md bg-gray-200"></div>
			</div>
			{/* Skeleton for Personal Information */}
			<div className="mb-6 rounded-lg border bg-white p-6">
				<div className="mb-4 h-6 w-48 animate-pulse rounded bg-gray-200"></div>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					{[...Array(6)].map((_, i) => (
						<div key={i}>
							<div className="mb-2 h-4 w-24 animate-pulse rounded bg-gray-200"></div>
							<div className="h-10 w-full animate-pulse rounded bg-gray-200"></div>
						</div>
					))}
					<div className="md:col-span-2">
						<div className="mb-2 h-4 w-24 animate-pulse rounded bg-gray-200"></div>
						<div className="h-10 w-full animate-pulse rounded bg-gray-200"></div>
					</div>
				</div>
			</div>
			{/* Skeleton for Education */}
			<div className="mb-6 rounded-lg border bg-white p-6">
				<div className="mb-4 h-6 w-48 animate-pulse rounded bg-gray-200"></div>
				{[...Array(2)].map((_, i) => (
					<div key={i} className="mb-4 border-b pb-4">
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							{[...Array(4)].map((_, j) => (
								<div key={j}>
									<div className="mb-2 h-4 w-24 animate-pulse rounded bg-gray-200"></div>
									<div className="h-10 w-full animate-pulse rounded bg-gray-200"></div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
			{/* Skeleton for Experience */}
			<div className="mb-6 rounded-lg border bg-white p-6">
				<div className="mb-4 h-6 w-48 animate-pulse rounded bg-gray-200"></div>
				{[...Array(2)].map((_, i) => (
					<div key={i} className="mb-4 border-b pb-4">
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							{[...Array(4)].map((_, j) => (
								<div key={j}>
									<div className="mb-2 h-4 w-24 animate-pulse rounded bg-gray-200"></div>
									<div className="h-10 w-full animate-pulse rounded bg-gray-200"></div>
								</div>
							))}
							<div className="md:col-span-2">
								<div className="mb-2 h-4 w-24 animate-pulse rounded bg-gray-200"></div>
								<div className="h-20 w-full animate-pulse rounded bg-gray-200"></div>
							</div>
						</div>
					</div>
				))}
			</div>
			{/* Skeleton for Additional Information */}
			<div className="rounded-lg border bg-white p-6">
				<div className="mb-4 h-6 w-48 animate-pulse rounded bg-gray-200"></div>
				<div className="h-32 w-full animate-pulse rounded bg-gray-200"></div>
			</div>
		</div>
	)
}
